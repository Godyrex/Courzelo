import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const expectedRole = route.data['expectedRole'];

    return this.auth.getRole().pipe(
      map(roles => {
        return roles.includes(expectedRole);
      }),
      catchError(error => {
        console.error('Error retrieving role:', error);
        return of(false);
      })
    );
  }
}
