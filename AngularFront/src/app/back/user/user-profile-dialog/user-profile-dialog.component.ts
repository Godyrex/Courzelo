import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {PanelService} from "../../../service/user/admin/panel.service";
import {UpdateService} from "../../../service/user/profile/update.service";
import {UserResponse} from "../../../model/user/UserResponse";

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string },
              private adminService:PanelService,
              private updateService:UpdateService) {}
  loginResponse: UserResponse = {}
  userPhotoUrl: any
  profileRoles: string[] = [];
  aboutMe: boolean = false;
  getImage() {
    this.updateService.getPhoto(this.loginResponse.profile?.photo!).subscribe((data: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userPhotoUrl = reader.result;
      };
      reader.readAsDataURL(data);
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('loggedIn') == 'true') {
      this.getMyInfo();
    }
  }

  getMyInfo() {
    this.adminService.getUserInfo(this.data.email).subscribe(
      response => {
        this.loginResponse = response;
        if(this.loginResponse.profile?.photo != null) {
          console.log("photoID: " + this.loginResponse.profile.photo)
          this.getImage();
        }
        this.profileRoles = this.loginResponse!.roles!.map(role => role.replace('ROLE_', ''));
        console.log(response);
      }
    )
  }

}
