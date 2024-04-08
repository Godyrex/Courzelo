import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../service/user/auth/token-storage.service";
import {UpdateService} from "../../../service/user/profile/update.service";
import {LoginResponse} from "../../../model/user/LoginResponse";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userPhotoUrl: any;
  isMenuOpen: boolean = false;
  isSuperAdminMenuOpen: boolean = false;
  isAdminMenuOpen: boolean = false;
  loginResponse: LoginResponse = {}

  constructor(
    private updateService: UpdateService
  ) {
  }

  toggleSuperAdminMenu() {
    this.isSuperAdminMenuOpen = !this.isSuperAdminMenuOpen;
  }

  toggleAdminMenu() {
    this.isAdminMenuOpen = !this.isAdminMenuOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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

  getMyInfo() {
    this.updateService.getMyInfo().subscribe(
      response => {
        this.loginResponse = response;
        if(this.loginResponse.photoID != null) {
          this.getImage();
        }
        console.log(response);
      }
    )
  }

  ngOnInit(): void {
    this.getMyInfo()
  }
}
