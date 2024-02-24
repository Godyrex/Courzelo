import {Component} from '@angular/core';
import {TokenStorageService} from "../../../service/user/auth/token-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdateService} from "../../../service/user/profile/update.service";
import {NameRequest} from "../../../model/user/NameRequest";
import {PasswordRequest} from "../../../model/user/PasswordRequest";
import {LoginResponse} from "../../../model/user/LoginResponse";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  nameRequest : NameRequest = {};
  passwordRequest : PasswordRequest = {};
  message = '';
  messageSuccess = '';
  user : LoginResponse={};
  constructor(
    private token: TokenStorageService,
    private updateService : UpdateService,
    private formBuilder : FormBuilder

  ) {
  }
  fullName : string = `${this.token.getUser().name} ${this.token.getUser().lastname}`;
  role : string = `${this.token.getUser().roles}`
  email : string = `${this.token.getUser().email}`
  nameForm = this.formBuilder.group({
    name: ['', [ Validators.maxLength(20), Validators.minLength(3)]],
    lastName: ['', [ Validators.maxLength(20), Validators.minLength(3)]],
  });
  passwordForm = this.formBuilder.group({
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    validator: this.checkingPasswords
  });
  public checkingPasswords(formGroup: FormGroup) {

    const newPassword = formGroup.get('newPassword')!.value;
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
  changeName(){
    if(this.nameForm.valid) {
      this.nameRequest = Object.assign(this.nameRequest,this.nameForm.value);
      console.log(this.nameRequest);
      this.updateService.changeName(this.nameRequest)
        .subscribe(data => {
            console.log(data)
            this.messageSuccess = data.msg!;
            this.user = this.token.getUser();
            this.user.name = this.nameForm.value.name!;
            this.user.lastname = this.nameForm.value.lastName!;
            this.token.saveUser(this.user);
            this.message = "";
          },
          error => {
            console.log("update name error :",error)
            this.messageSuccess = "";
            this.message = error.error.msg;
          });
    }
  }
  changePassword(){
    if(this.passwordForm.valid) {
      this.passwordRequest.password = this.passwordForm.controls['password'].value!;
      this.passwordRequest.newPassword = this.passwordForm.controls['newPassword'].value!;
      console.log(this.passwordRequest);
      this.updateService.changePassword(this.passwordRequest)
        .subscribe(data => {
            console.log(data)
            this.message = "";
            this.messageSuccess = data.msg!;
          },
          error => {
            console.log("update password error :",error)
            this.messageSuccess = "";
            this.message = error.error.msg;
          });
    }
  }
}
