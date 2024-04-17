import {Component, OnInit} from '@angular/core';
import {AuthGuardService} from "../../service/user/guard/auth-guard.service";
import {UpdateService} from "../../service/user/profile/update.service";
import {LoginResponse} from "../../model/user/LoginResponse";

@Component({
  selector: 'app-frontheader',
  templateUrl: './frontheader.component.html',
  styleUrls: ['./frontheader.component.css']
})
export class FrontheaderComponent implements OnInit {
  userRoles: LoginResponse = {};
  auth: any = false;

  constructor(private updateService: UpdateService,
              private authGuardService: AuthGuardService) {
  }

  ngOnInit(): void {
    this.getMyInfo();
    this.auth = this.authGuardService.canActivate();
    console.log("User Authenticated : " + this.auth)
  }

  getMyInfo() {
    this.updateService.getMyInfo().subscribe(
      response => {
        this.userRoles = response;
        console.log(response);
      }
    )
  }
}
