import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";
import {catchError, map, Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const expectedRole = route.data['expectedRole'];

    return this.auth.isAuthenticated().pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.auth.getRole().pipe(
            map(roles => {
              return roles.includes(expectedRole);
            }),
            catchError(error => {
              console.error('Error retrieving role:', error);
              return of(false);
            })
          );
        } else {
          return of(false);
        }
      }),
      catchError(error => {
        console.error('Error checking authentication:', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
