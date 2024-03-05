import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../service/user/auth/token-storage.service";
import {UpdateService} from "../../../service/user/profile/update.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  fullName: string = `${this.token.getUser().name} ${this.token.getUser().lastname}`;
  role: string = `${this.token.getUser().roles}`
  email: string = `${this.token.getUser().email}`
  institutionName: string = ""
  institutionClassName: string = ""
  userPhotoUrl: any;
  constructor(
    private token: TokenStorageService,
    private updateService: UpdateService
  ) {
  }
  getImage() {
    this.updateService.getPhoto(this.token.getUser().photoID!).subscribe((data: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userPhotoUrl = reader.result;
      };
      reader.readAsDataURL(data);
    });
  }

  ngOnInit(): void {
    this.getImage();
    const user = this.token.getUser();
    if (user && user.institution) {
      this.institutionName = user.institution;
    }
    if (user && user.institutionClass) {
      this.institutionClassName = user.institutionClass;
    }
  }
}
