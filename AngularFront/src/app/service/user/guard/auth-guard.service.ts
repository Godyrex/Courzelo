import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(): Observable<boolean> {
    return of(localStorage.getItem('loggedIn') === 'true');
  }

  static isLoggedIn() {
    return !!localStorage.getItem('loggedIn');
  }
  static setLoggedIn() {
    localStorage.setItem('loggedIn', 'true');
  }
  static unsetLoggedIn() {
    localStorage.setItem('loggedIn', 'false');
  }
}
