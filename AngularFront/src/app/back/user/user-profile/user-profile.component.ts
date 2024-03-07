import {Component, OnInit} from '@angular/core';
import {UpdateService} from "../../../service/user/profile/update.service";
import {LoginResponse} from "../../../model/user/LoginResponse";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loginResponse: LoginResponse = {}
  userPhotoUrl: any

  constructor(
    private updateService: UpdateService
  ) {
  }

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
    this.updateService.getMyInfo().subscribe(
      response => {
        this.loginResponse = response;
        this.getImage();
        console.log(response);
      }
    )
  }
}
