import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../../../model/user/LoginRequest";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/user/auth/authentication.service";
import {TokenStorageService} from "../../../service/user/auth/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthGuardService} from "../../../service/user/guard/auth-guard.service";

@Component({
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [animate('400ms ease-in-out')]),
      transition('out => in', [animate('400ms ease-in-out')])
    ])
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginAnimationState = 'in';
  public tfaAnimationState = 'out';
  public deviceAnimationState = 'out';

  toggleLoginAnimation() {
    this.loginAnimationState = this.loginAnimationState === 'out' ? 'in' : 'out';
  }
  toggleTFAAnimation() {
    this.tfaAnimationState = this.tfaAnimationState === 'out' ? 'in' : 'out';
  }
  toggleDeviceAnimation() {
    this.deviceAnimationState = this.deviceAnimationState === 'out' ? 'in' : 'out';
  }
  verification: boolean = false;
  code: number = 0;
  loginResponse: LoginResponse = {};
  loginRequest: LoginRequest = {};
  showTwoFactorAuthInput: boolean = false;
  loginForm = this.formBuilder.group({
    email: ['',
      [Validators.required, Validators.email]],
    password: ['',
      [Validators.required]],
    rememberMe: ['',]
  });
  TFAForm = this.formBuilder.group({
    twoFactorAuthCode: ['',
      [Validators.required]]
  });
  verificationForm = this.formBuilder.group({
    code: ['',
      [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
  });
  message = '';
  messageSuccess = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  login() {
    if (this.loginForm.valid) {
      this.loginRequest.email = this.loginForm.controls['email'].value!.toLowerCase();
      this.loginRequest.password = this.loginForm.controls['password'].value!;
      this.loginRequest.rememberMe = this.loginForm.controls['rememberMe'].value != null;
      this.authService.login(this.loginRequest).subscribe(
        response => {
          console.log("start login")
          console.log(response)
          if(response && response.msg && response.msg === 'Two Factor Authentication Required') {
            console.log("tfa")
            this.toggleLoginAnimation();
            this.toggleTFAAnimation();
            this.showTwoFactorAuthInput = true;
            this.toastr.info('Please enter the verification code from your mobile app', 'Two Factor Authentication Required');
          }else {
            if (response && response.deviceIsNew !== undefined) {
              console.log("device not confirmed")
              if (response.deviceIsNew) {
                console.log(this.loginRequest.rememberMe)
                this.toggleLoginAnimation();
                this.toggleDeviceAnimation();
                this.toastr.info('Please enter the verification code sent to your email', 'Verification Required');
              }
            } else {
              AuthGuardService.setLoggedIn();
              console.log("logging in")
              console.log(this.loginRequest.rememberMe)
              this.toastr.success('Login Successful');
              this.router.navigate(['settings/profile']);
            }
          }
        },
        error => {
          if(error && error.error && error.error.msg) {
            this.toastr.error(error.error.msg, 'Login Failed');
          }
        });
    }
  }
  verifyTwoFactorAuth() {
    this.authService.loginTFA(this.loginRequest,this.TFAForm.controls['twoFactorAuthCode'].value!).subscribe(
      (response: any) => {
        AuthGuardService.setLoggedIn();
        console.log(this.loginRequest.rememberMe)
        this.toastr.success('Login Successful');
        this.router.navigate(['settings/profile']);
      },
      error => {
        this.toastr.error(error.error.msg, 'Login Failed');
      });
  }


    submitVerificationCode() {
    if (this.verificationForm.valid) {
      this.code = +this.verificationForm.controls['code'].value!;
      this.authService.confirmDevice(this.loginRequest, this.code).subscribe(
        response => {
          AuthGuardService.setLoggedIn();
          this.toastr.success('Login Successful');
          this.router.navigate(['settings/profile']);
        },
        error => {
          this.toastr.error(error.error.msg, 'Verification Failed');
        });
    }
  }
}
