import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../service/user/auth/authentication.service";

@Component({
  selector: 'app-recover-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  passwordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });
  messageError = '';
  messageSuccess = '';

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
  }

  forgotPassword() {
    if (this.passwordForm.valid) {
      this.authService.forgotPassword(this.passwordForm.controls['email'].value!).subscribe(
        response => {
          this.messageError = '';
          this.messageSuccess = response.msg!;
        },
        error => {
          this.messageError = 'An error has occured';
          this.messageSuccess = '';
          console.log(error)
        });
    }
  }

  resetSuccessAlert() {
    this.messageSuccess = "";
  }

  resetErrorAlert() {
    this.messageError = "";
  }
}
