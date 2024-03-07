import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../../../model/user/LoginRequest";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/user/auth/authentication.service";
import {TokenStorageService} from "../../../service/user/auth/token-storage.service";

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
  loginForm = this.formBuilder.group({
    email: ['',
      [Validators.required, Validators.email]],
    password: ['',
      [Validators.required]],
    rememberMe: ['',]
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
    private formBuilder: FormBuilder
  ) {
  }

  login() {
    if (this.loginForm.valid) {
      this.loginRequest.email = this.loginForm.controls['email'].value!.toLowerCase();
      this.loginRequest.password = this.loginForm.controls['password'].value!;
      if (this.loginForm.controls['rememberMe'].value == null) {
        this.loginRequest.rememberMe = false;
      } else {
        this.loginRequest.rememberMe = true;
      }
      this.authService.login(this.loginRequest).subscribe(
        response => {
          if (response.deviceIsNew !== undefined) {
            console.log("device not confirmed")
            if (response.deviceIsNew) {
              console.log(this.loginRequest.rememberMe)
              this.verification = true;
              this.message = '';
              this.messageSuccess = '';
            }
          } else {
            console.log(this.loginRequest.rememberMe)
            this.message = '';
            this.loginResponse = response;
            this.router.navigate(['settings/profile']);
          }
        },
        error => {
          console.log(error)
          this.message = error.error.msg;
        });
    }
  }

  submitVerificationCode() {
    if (this.verificationForm.valid) {
      this.code = +this.verificationForm.controls['code'].value!;
      this.authService.confirmDevice(this.loginRequest, this.code).subscribe(
        response => {
          this.loginResponse = response;
          this.token.saveUser(response);
          this.router.navigate(['']);

        },
        error => {
          this.message = 'Verification Code is invalid';
          this.messageSuccess = '';
          console.log(error)
          this.message = error.error.msg;
        });
    }
  }
}
