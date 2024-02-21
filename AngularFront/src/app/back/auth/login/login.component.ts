import { Component } from '@angular/core';
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
  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private token: TokenStorageService,
    private formBuilder : FormBuilder
  ) {
  }
  loginResponse : LoginResponse = {};
  loginRequest : LoginRequest = {};
  loginForm = this.formBuilder.group({
    email: ['',
      [Validators.required,Validators.email]],
    password: ['',
      [Validators.required]]
  });
  message = '';
  login() {
    if (this.loginForm.valid ) {
      this.loginRequest = Object.assign(this.loginRequest, this.loginForm.value);
      this.authService.login(this.loginRequest).subscribe(
        response => {
          this.message = '';
          this.loginResponse = response;
          this.token.saveToken(this.loginResponse.token as string);
          this.token.saveUser(response);
          this.router.navigate(['']);
        },
        error => {
          console.log(error)
          this.message = error.error.msg;
        });
    }
  }
}
