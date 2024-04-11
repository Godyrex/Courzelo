import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
import {AuthenticationService} from "../../../service/user/auth/authentication.service";
import {QRCodeResponse} from "../../../model/user/QRCodeResponse";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {QaDialogComponent} from "../qa-dialog/qa-dialog.component";
import {UserContact} from "../../../model/user/UserContact";
import {UserAddress} from "../../../model/user/UserAddress";
import {tap} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', animate(500)),
    ]),
  ]
})
export class ProfileComponent implements OnInit{
  loading = false;
  toggleLoading(): void {
    this.loading = true;
  }
  nameRequest: NameRequest = {};
  userContact : UserContact = {};
  userAddress : UserAddress = {};
  emailRequest: EmailRequest = {};
  selectedCountry: string= '';
  showStatesForm: boolean = false;
  countries: any[] = [];
  states: any[] = [];
  qrCodeImage: string = '';
  deleteAccountRequest: DeleteAccountRequest = {};
  passwordRequest: PasswordRequest = {};
  messageError = '';
  messageSuccess = '';
  user: LoginResponse = {};
  uploadProgress: number = 0;
  selectedFile: File | undefined;
  showVerification: boolean = false;
  showEmailForm: boolean = true;
  verificationCode: string = '';
  emailForm = this.formBuilder.group({
    email: ['', [Validators.email]],
  });
  photoForm = this.formBuilder.group({
    photo: ['', [Validators.required]],
  });
  contactForm = this.formBuilder.group({
    phone: [this.userContact.phoneNumber, [Validators.maxLength(20), Validators.minLength(5)]],
    facebook: [this.userContact.facebook],
    github: [this.userContact.github],
    linkedin: [this.userContact.linkedin],
    address: [this.userContact.userAddress?.address],
    city: [this.userContact.userAddress?.city],
    state: [this.userContact.userAddress?.state],
    country: [this.userContact.userAddress?.country],
    zipCode: [this.userContact.userAddress?.zipCode],
  });

  verificationForm = this.formBuilder.group({
    code: ['', [Validators.maxLength(4), Validators.minLength(4)]],
  });
  nameForm = this.formBuilder.group({
    name: ['', [Validators.maxLength(20), Validators.minLength(3)]],
    lastName: ['', [Validators.maxLength(20), Validators.minLength(3)]],
  });
  tfaForm = this.formBuilder.group({
    verificationCode: ['', [Validators.required]],
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
  @Output() userInfoChanged = new EventEmitter<void>();
  constructor(
    private token: TokenStorageService,
    private router: Router,
    private updateService: UpdateService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private authService: AuthenticationService,
    public dialog:MatDialog
  ) {
  }
  onCountryChange(countryCode: string): void {
    this.updateService.getStates(countryCode).subscribe(states => {
      this.states = states;
      this.showStatesForm = true;
    });
  }
  openDialog(): void {
    this.dialog.open(QaDialogComponent);
  }
  ngOnInit(): void {
        this.getMyInfo();
        this.getMyContactInfo();
        this.updateService.getCountries().subscribe(countries => {
          this.countries = countries;
          console.log(countries);
        });
    }
  updateContact(){
    this.userContact.phoneNumber = this.contactForm.controls['phone'].value!;
    this.userContact.facebook = this.contactForm.controls['facebook'].value!;
    this.userContact.github = this.contactForm.controls['github'].value!;
    this.userContact.linkedin = this.contactForm.controls['linkedin'].value!;
    this.userAddress.address = this.contactForm.controls['address'].value!;
    this.userAddress.city = this.contactForm.controls['city'].value!;
    this.userAddress.state = this.contactForm.controls['state'].value!;
    this.userAddress.country = this.contactForm.controls['country'].value!;
    this.userAddress.zipCode = this.contactForm.controls['zipCode'].value!;
    this.userContact.userAddress = this.userAddress;
    this.updateService.updateUserContact(this.userContact).subscribe(
      response => {
        console.log(response);
        this.toaster.success('Contact information updated successfully', 'Success');
      },
      error => {
        console.log(error);
        this.toaster.error('Error updating contact information', 'Error');
      }
    )
  }
  getMyContactInfo() {
    this.updateService.getMyContactInfo().pipe(
      tap(response => {
        this.userContact = response;
        console.log("get my contact ",response);

        // Initialize the form here
        this.contactForm = this.formBuilder.group({
          phone: [this.userContact.phoneNumber, [Validators.maxLength(20), Validators.minLength(5)]],
          facebook: [this.userContact.facebook],
          github: [this.userContact.github],
          linkedin: [this.userContact.linkedin],
          address: [this.userContact.userAddress?.address],
          city: [this.userContact.userAddress?.city],
          state: [this.userContact.userAddress?.state],
          country: [this.userContact.userAddress?.country],
          zipCode: [this.userContact.userAddress?.zipCode],
        });
        if(this.userContact.userAddress?.country!=null){
          this.onCountryChange(this.userContact.userAddress?.country);
        }
      })
    ).subscribe();
  }
  getMyInfo() {
    this.updateService.getMyInfo().subscribe(
      response => {
        this.user = response;
        console.log(response);
      }
    )
  }
  checkUserProfileImage() {
    if (!this.user.photoID) {
      const lastNotification = localStorage.getItem('lastImageNotification');
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
      if (!lastNotification || now - Number(lastNotification) > oneDay) {
        this.toaster.info('Enhance your profile by adding a profile picture.');
        localStorage.setItem('lastImageNotification', String(now));
      }
    }
  }
  checkUserProfileTwoFactorAuth() {
    if (!this.user.twoFactorAuthEnabled) {
      const lastNotification = localStorage.getItem('lastTwoFactorAuthNotification');
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      if (!lastNotification || now - Number(lastNotification) > oneDay) {
        this.toaster.info('Secure your account by enabling two factor authentication.');
        localStorage.setItem('lastTwoFactorAuthNotification', String(now));
      }
    }
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

  enableTwoFactorAuth() {
    this.verificationCode = this.tfaForm.controls['verificationCode'].value!;
    this.authService.enableTwoFactorAuth(this.verificationCode)
      .subscribe(
        data => {
          console.log(data);
          this.toaster.success('Two factor authentication enabled successfully', 'Success')
          this.getMyInfo()
        },
        error => {
          console.log(error);
          this.toaster.error('Error enabling two factor authentication', 'Error')
        }
      );
  }

  generateTwoFactorAuthQrCode() {
    this.authService.generateTwoFactorAuthQrCode()
      .subscribe(
        (data: QRCodeResponse) => {
          this.qrCodeImage = 'data:image/png;base64,' + data.qrCodeImage;
          this.toaster.success('QR code generated successfully', 'Success')
        },
        error => {
          console.log(error);
          this.toaster.error('Error generating QR code', 'Error');
        }
      );
  }
  disableTwoFactorAuth() {
    this.authService.disableTwoFactorAuth()
      .subscribe(
        data => {
          console.log(data);
          this.toaster.success('Two factor authentication disabled successfully', 'Success')
          this.getMyInfo()
        },
        error => {
          console.log(error);
          this.toaster.error('Error disabling two factor authentication', 'Error')
        }
      );
  }
  changeName() {
    if (this.nameForm.valid) {
      this.nameRequest = Object.assign(this.nameRequest, this.nameForm.value);
      console.log(this.nameRequest);
      this.updateService.changeName(this.nameRequest)
        .subscribe(data => {
            console.log(data)
            this.getMyInfo()
            this.toaster.success("Name updated successfully", "Success");
            this.userInfoChanged.emit();
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
            this.userInfoChanged.emit();
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
          this.toaster.success('Verification code sent successfully', 'Success')
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
