import {Component} from '@angular/core';
import {TokenStorageService} from "../../service/user/auth/token-storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  fullName: string = `${this.token.getUser().name} ${this.token.getUser().lastname}`;
  userRoles = this.token.getUser().roles!;
  auth = this.token.isAuthenticated();

  constructor(
    private token: TokenStorageService
  ) {
  }
}
