import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../service/user/auth/authentication.service";
import {ToastrService} from "ngx-toastr";

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
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  forgotPassword() {
    if (this.passwordForm.valid) {
      this.authService.forgotPassword(this.passwordForm.controls['email'].value!).subscribe(
        response => {
        this.toastr.success("An email has been sent to you with instructions on how to reset your password", "Success");
        },
        error => {
        this.toastr.error("An error occurred, please try again later", "Error");
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
