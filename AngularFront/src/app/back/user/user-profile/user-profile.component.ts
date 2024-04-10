import {Component, EventEmitter, Input, OnInit} from '@angular/core';
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
  @Input() userInfoChanged?: EventEmitter<void>;


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
    this.listenForChanges()
  }

  getMyInfo() {
    this.updateService.getMyInfo().subscribe(
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
