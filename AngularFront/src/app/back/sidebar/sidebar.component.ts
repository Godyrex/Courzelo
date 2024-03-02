import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/user/auth/token-storage.service";
import {UpdateService} from "../../service/user/profile/update.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  fullName: string = `${this.token.getUser().name} ${this.token.getUser().lastname}`;
  userRoles = this.token.getUser().roles!;
  auth = this.token.isAuthenticated();
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
    //  this.getImage();
  }
}
