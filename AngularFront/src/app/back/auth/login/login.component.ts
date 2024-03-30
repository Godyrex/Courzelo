import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../../../model/user/LoginRequest";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/user/auth/authentication.service";
import {TokenStorageService} from "../../../service/user/auth/token-storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
    private token: TokenStorageService,
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
          console.log(response)
          if(response.msg === 'Two Factor Authentication Required') {
            this.showTwoFactorAuthInput = true;
          }else {
            if (response.deviceIsNew !== undefined) {
              console.log("device not confirmed")
              if (response.deviceIsNew) {
                console.log(this.loginRequest.rememberMe)
                this.verification = true;
                this.toastr.info('Please enter the verification code sent to your email', 'Verification Required');
              }
            } else {
              console.log(this.loginRequest.rememberMe)
              this.toastr.success('Welcome ' + response.name + ' ' + response.lastname, 'Login Successful');
              this.loginResponse = response;
              this.router.navigate(['settings/profile']);
            }
          }
        },
        error => {
          this.toastr.error(error.error.msg, 'Login Failed');
        });
    }
  }
  verifyTwoFactorAuth() {
    this.authService.loginTFA(this.loginRequest,this.TFAForm.controls['twoFactorAuthCode'].value!).subscribe(
      (response: any) => {
        console.log(this.loginRequest.rememberMe)
        this.toastr.success('Welcome ' + response.name + ' ' + response.lastname, 'Login Successful');
        this.loginResponse = response;
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
          this.loginResponse = response;
          this.token.saveUser(response);
          this.toastr.success('Welcome ' + response.name + ' ' + response.lastname, 'Login Successful');
          this.router.navigate(['']);
        },
        error => {
          this.toastr.error(error.error.msg, 'Verification Failed');
        });
    }
  }
}
