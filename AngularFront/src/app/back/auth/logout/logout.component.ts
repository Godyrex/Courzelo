import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../../service/user/auth/authentication.service";
import {UpdateService} from "../../../service/user/profile/update.service";
import {AuthGuardService} from "../../../service/user/guard/auth-guard.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private toastr: ToastrService,
              private authenticationService: AuthenticationService,
              private updateService: UpdateService,
  ) {
  }

  ngOnInit(): void {
    AuthGuardService.unsetLoggedIn();
    this.updateService.clearUserInfo();
    this.authenticationService.logout().subscribe(() => {
      this.toastr.success('You have been logged out', 'Success')
      localStorage.clear();
    }, error => {
      this.toastr.error('An error occurred while logging out', 'Error');
    });
    this.router.navigate(['/login']);
  }
}
