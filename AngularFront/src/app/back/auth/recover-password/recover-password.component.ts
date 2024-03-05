import {Component} from '@angular/core';
import {AuthenticationService} from "../../../service/user/auth/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecoverPasswordRequest} from "../../../model/user/RecoverPasswordRequest";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  passwordRequest: RecoverPasswordRequest = {}
  token: string = "";
  passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    },
    {
      validator: this.ConfirmedValidator('password', 'confirmPassword'),
    }
  );
  messageError = '';
  messageSuccess = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  recoverPassword() {
    if (this.passwordForm.valid) {
      this.passwordRequest.password = this.passwordForm.controls['password'].value!;
      this.route.queryParams.subscribe(params => {
        this.token = params['token'];
      });
      this.authService.recoverPassword(this.token, this.passwordRequest).subscribe(
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
