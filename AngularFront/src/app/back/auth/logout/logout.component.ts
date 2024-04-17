import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private logoutUrl = 'http://localhost:8081/api/v1/auth/logout';

  constructor(private router: Router, private http: HttpClient,
              private toastr: ToastrService) {
  }

  logout() {
    return this.http.post(this.logoutUrl, null);
  }

  ngOnInit(): void {
    this.logout().subscribe();
    localStorage.clear();
    this.toastr.success('You have been logged out', 'Success')
    this.router.navigate(['/login']);
  }
}
