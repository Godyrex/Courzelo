import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {UpdateService} from "../../../service/user/profile/update.service";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {UserContact} from "../../../model/user/UserContact";
import {UserResponse} from "../../../model/user/UserResponse";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loginResponse: UserResponse = {}
  userContact:UserContact = {}
  userPhotoUrl: any
  @Input() userInfoChanged?: EventEmitter<void>;
  profileRoles: string[] = [];
  aboutMe: boolean = false;

  constructor(
    private updateService: UpdateService
  ) {
  }

  listenForChanges(): void {
    this.userInfoChanged?.subscribe(() => {
      this.getMyInfo();
    });
  }
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
    this.getMyInfo();
    this.listenForChanges()
  }

  getMyInfo() {
    this.updateService.getMyInfo().subscribe(
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
  getMyContactInfo() {
    this.updateService.getMyContactInfo().subscribe(
      response => {
        this.userContact = response;
        console.log(response);
      }
    )
  }
}
