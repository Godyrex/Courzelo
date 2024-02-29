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
  registerRequest: RegisterRequest = {};
  message = '';
  messageSuccess = '';
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    validator: this.checkingPasswords
  });

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
  }

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

  registerUser() {
    if (this.registerForm.valid) {
      this.registerRequest.email = this.registerForm.controls['email'].value!.toLowerCase().trim();
      this.registerRequest.name = this.registerForm.controls['name'].value!.toLowerCase().trim();
      this.registerRequest.lastname = this.registerForm.controls['lastname'].value!.toLowerCase().trim();
      this.registerRequest.password = this.registerForm.controls['password'].value!;
      this.registerRequest.name = this.registerRequest.name.charAt(0).toUpperCase() + this.registerRequest.name.slice(1);
      this.registerRequest.lastname = this.registerRequest.lastname.charAt(0).toUpperCase() + this.registerRequest.lastname.slice(1);

      console.log(this.registerRequest);
      this.authService.register(this.registerRequest)
        .subscribe(data => {
            console.log(data)
            this.messageSuccess = data.msg!;
          },
          error => {
            console.log("register error :", error)
            this.message = error.error.msg;
          });
    }

  }
}
