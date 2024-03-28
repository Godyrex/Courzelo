import {Component} from '@angular/core';
import {TokenStorageService} from "../../../service/user/auth/token-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdateService} from "../../../service/user/profile/update.service";
import {NameRequest} from "../../../model/user/NameRequest";
import {PasswordRequest} from "../../../model/user/PasswordRequest";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {EmailRequest} from "../../../model/user/EmailRequest";
import {Router} from "@angular/router";
import {DeleteAccountRequest} from "../../../model/user/DeleteAccountRequest";
import {ToastrService} from "ngx-toastr";

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
  messageError = '';
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
    photo: ['', [Validators.required]],
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
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    });
  deleteForm = this.formBuilder.group({
    password: ['', [Validators.required]],
  });

  constructor(
    private token: TokenStorageService,
    private router: Router,
    private updateService: UpdateService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
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

  resetSuccessAlert() {
    this.messageSuccess = "";
  }

  resetErrorAlert() {
    this.messageError = "";
  }

  changeName() {
    if (this.nameForm.valid) {
      this.nameRequest = Object.assign(this.nameRequest, this.nameForm.value);
      console.log(this.nameRequest);
      this.updateService.changeName(this.nameRequest)
        .subscribe(data => {
            console.log(data)
            this.user = this.token.getUser();
            this.user.name = this.nameForm.value.name!;
            this.user.lastname = this.nameForm.value.lastName!;
            this.token.saveUser(this.user);
            this.toaster.success("Name updated successfully", "Success");
          },
          error => {
            console.log("update name error :", error)
            this.toaster.error(error.error.msg, "Error")
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
            this.toaster.success("Photo updated successfully", "Success");
            this.selectedFile = null!;
          }
        });
    }

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
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
        this.toaster.success("Account deleted successfully", "Success")
        this.router.navigate(['/logout']);
      },
      error => {
        console.log("delete account error :", error)
        this.toaster.error(error.error.msg, "Error")
        console.log(error)
      });
  }


  changePassword() {
    if (this.passwordForm.valid) {
      this.passwordRequest.password = this.passwordForm.controls['password'].value!;
      this.passwordRequest.newPassword = this.passwordForm.controls['newPassword'].value!;
      console.log(this.passwordRequest);
      this.updateService.changePassword(this.passwordRequest)
        .subscribe(data => {
            console.log(data)
          this.toaster.success("Password updated successfully", "Success");
          },
          error => {
            console.log("update password error :", error)
            this.toaster.error(error.error.msg, "Error")
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
          this.toaster.show('Verification code sent successfully', 'Success')
        },
        (error: any) => {
          console.error('Error sending verification code:', error);
          this.toaster.error('Error sending verification code', 'Error')
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
          this.toaster.success('Email Changed successfully Logging out ....', 'Success');
          this.router.navigate(['/logout']);
        },
        (error: any) => {
          this.toaster.error('Error changing email', 'Error')
          console.error('Error sending verification code:', error);
        }
      );
    }
  }


}
