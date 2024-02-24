import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterRequest} from "../../../model/RegisterRequest";
import {AuthenticationService} from "../../../service/user/auth/authentication.service";


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
    validator: this.checkingPasswords
  });
  public checkingPasswords(formGroup: FormGroup) {

    const newPassword = formGroup.get('password')!.value;
    const confirmPassword = formGroup.get('confirmPassword')!.value;

    // Check if new password and confirm password match
    if (newPassword === confirmPassword) {
      // If passwords match, clear the error on confirmPassword control
      formGroup.get('confirmPassword')!.setErrors(null);
    } else {
      // If passwords don't match, set 'notMatched' error on confirmPassword control
      formGroup.get('confirmPassword')!.setErrors({notMatched: true});
    }
  }
  registerUser(){
    if(this.registerForm.valid) {
      this.registerRequest.email = this.registerForm.controls['email'].value!;
      this.registerRequest.name = this.registerForm.controls['name'].value!;
      this.registerRequest.lastname = this.registerForm.controls['lastname'].value!;
      this.registerRequest.password = this.registerForm.controls['password'].value!;
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
