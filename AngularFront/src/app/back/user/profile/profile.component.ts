import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../service/user/auth/token-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdateService} from "../../../service/user/profile/update.service";
import {NameRequest} from "../../../model/user/NameRequest";
import {PasswordRequest} from "../../../model/user/PasswordRequest";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {EmailRequest} from "../../../model/user/EmailRequest";
import {Router} from "@angular/router";
import {DeleteAccountRequest} from "../../../model/user/DeleteAccountRequest";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  nameRequest: NameRequest = {};
  emailRequest: EmailRequest = {};
  deleteAccountRequest: DeleteAccountRequest = {};
  passwordRequest: PasswordRequest = {};
  message = '';
  messageSuccess = '';
  user: LoginResponse = {};
  uploadProgress: number = 0;
  selectedFile: File | undefined;
  showVerification: boolean = false;
  showEmailForm: boolean = true;
  emailForm = this.formBuilder.group({
    email: ['', [Validators.email]],
  });
  photoForm = this.formBuilder.group({
    photo: ['', [Validators.email]],
  });
  verificationForm = this.formBuilder.group({
    code: ['', [Validators.maxLength(4), Validators.minLength(4)]],
  });
  nameForm = this.formBuilder.group({
    name: ['', [Validators.maxLength(20), Validators.minLength(3)]],
    lastName: ['', [Validators.maxLength(20), Validators.minLength(3)]],
  });
  passwordForm = this.formBuilder.group({
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    validator: this.checkingPasswords
  });
  deleteForm = this.formBuilder.group({
    password: ['', [Validators.required]],
  });

  constructor(
    private token: TokenStorageService,
    private router: Router,
    private updateService: UpdateService,
    private formBuilder: FormBuilder
  ) {
  }

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



  changeName() {
    if (this.nameForm.valid) {
      this.nameRequest = Object.assign(this.nameRequest, this.nameForm.value);
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
            console.log("update name error :", error)
            this.messageSuccess = "";
            this.message = error.error.msg;
          });
    }
  }

  changePhoto() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log(formData);
      this.updateService.changePhoto(this.selectedFile)
        .subscribe(progress => {
          this.uploadProgress = progress;
          if (progress === 100) {
            alert("File upload completed")
            this.selectedFile = null!;
          }
        });
    }

  }

  confirmDelete(): void {
    if (this.deleteForm.valid) {
      if (confirm('Are you sure you want to delete your account?')) {
        this.deleteAccount();
      }
    }
  }

  deleteAccount(): void {
    this.deleteAccountRequest.password = this.deleteForm.controls['password'].value!;
    this.updateService.deleteAccount(this.deleteAccountRequest).subscribe(data => {
        console.log(data)
        console.log('Account deleted successfully!');
        this.router.navigate(['/logout']);
      },
      error => {
        console.log("delete account error :", error)
        console.log(error)
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  changePassword() {
    if (this.passwordForm.valid) {
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
            console.log("update password error :", error)
            this.messageSuccess = "";
            this.message = error.error.msg;
          });
    }
  }

  sendVerificationCode() {
    if (this.emailForm.valid) {
      this.updateService.sendVerificationCode().subscribe(
        (response: any) => {
          this.showVerification = true;
          this.showEmailForm = false;
          console.log('Verification code sent successfully:', response);
        },
        (error: any) => {
          console.error('Error sending verification code:', error);
        }
      );
    }
  }

  changeEmail() {
    if (this.verificationForm.valid) {
      this.emailRequest.email = this.emailForm.controls['email'].value!;
      this.emailRequest.code = +this.verificationForm.controls['code'].value!;
      this.updateService.changeEmail(this.emailRequest).subscribe(
        (response: any) => {
          this.showVerification = false;
          this.showEmailForm = true;
          console.log('Email Changed successfully Logging out ....:', response);
          this.router.navigate(['/logout']);
        },
        (error: any) => {
          console.error('Error sending verification code:', error);
        }
      );
    }
  }



}
