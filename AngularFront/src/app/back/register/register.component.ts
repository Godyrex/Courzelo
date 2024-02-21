import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RegisterRequest} from "../../model/RegisterRequest";
import {AuthenticationService} from "../../service/user/auth/authentication.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest : RegisterRequest = {};
  message = '';
  messageSuccess = '';
  constructor(
    private authService : AuthenticationService,
    private formBuilder : FormBuilder
  ) {
  }
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
  });
  registerUser(){
    if(this.registerForm.valid) {
      this.registerRequest = Object.assign(this.registerRequest,this.registerForm.value);
      console.log(this.registerRequest);
      this.authService.register(this.registerRequest)
        .subscribe(data => {
            console.log(data)
            this.messageSuccess = data.msg!;
          },
          error => {
            console.log("register error :",error)
            this.message = error.error.msg;
          });
    }

  }
}
