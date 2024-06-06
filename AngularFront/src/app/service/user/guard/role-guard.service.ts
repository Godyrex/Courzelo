import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRole'];
    const user = JSON.parse(localStorage.getItem('user')!);
    const userRoles = user.roles.map((role: string) => role.replace('ROLE_', ''));
    return userRoles.some((role: string) => expectedRoles.includes(role));
  }
}
