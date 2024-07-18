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
  user: LoginResponse | null = null;

  constructor(private updateService: UpdateService) {
  }

  ngOnInit(): void {
    if (AuthGuardService.isLoggedIn()) {
      this.getMyInfo();
    }
  }

  getMyInfo() {
    this.updateService.getMyInfo().subscribe(
      response => {
        this.user = response;
      }
    )
  }
}
