import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private logoutUrl = 'http://localhost:8081/api/v1/auth/logout';
  constructor(private router: Router,private http: HttpClient) { }
  logout() {
    return this.http.post(this.logoutUrl, null);
  }
  ngOnInit(): void {
    this.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
