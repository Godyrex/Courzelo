import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {PanelService} from "../../../service/user/admin/panel.service";
import {UpdateService} from "../../../service/user/profile/update.service";

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string },
              private adminService:PanelService,
              private updateService:UpdateService) {}
  loginResponse: LoginResponse = {}
  userPhotoUrl: any
  getImage() {
    this.updateService.getPhoto(this.loginResponse.photoID!).subscribe((data: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userPhotoUrl = reader.result;
      };
      reader.readAsDataURL(data);
    });
  }

  ngOnInit(): void {
    this.getMyInfo();
  }

  getMyInfo() {
    this.adminService.getUserInfo(this.data.email).subscribe(
      response => {
        this.loginResponse = response;
        if(this.loginResponse.photoID != null) {
          console.log("photoID: " + this.loginResponse.photoID)
          this.getImage();
        }
        console.log(response);
      }
    )
  }

}
