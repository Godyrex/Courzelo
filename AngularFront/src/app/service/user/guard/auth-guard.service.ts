import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated().pipe(
      map(response => {
        return response;
      })
    );
  }
}
