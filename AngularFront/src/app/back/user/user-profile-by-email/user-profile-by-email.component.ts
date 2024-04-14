import {Component, Inject, Input, OnInit} from '@angular/core';
import {UserResponse} from "../../../model/user/UserResponse";
import {PanelService} from "../../../service/user/admin/panel.service";
import {UpdateService} from "../../../service/user/profile/update.service";

@Component({
  selector: 'app-user-profile-by-email',
  templateUrl: './user-profile-by-email.component.html',
  styleUrls: ['./user-profile-by-email.component.css']
})
export class UserProfileByEmailComponent implements OnInit{
  constructor(private adminService:PanelService,
              private updateService:UpdateService) {}
  loginResponse: UserResponse = {}
  userPhotoUrl: any
  @Input() email: string = "";
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
  getMyInfo() {
    this.adminService.getUserInfo(this.email).subscribe(
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

  ngOnInit(): void {
    this.getMyInfo();
  }
}
