import {Injectable} from '@angular/core';
import {LoginResponse} from "../../../model/user/LoginResponse";

const USER_KEY = 'auth-user';
const AUTH_KEY = 'authentication';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  signOut(): void {
    window.localStorage.clear();
  }


  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.localStorage.setItem(AUTH_KEY,"true");
  }

  public getUser(): LoginResponse {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public isAuthenticated() : boolean{
    return window.localStorage.getItem(AUTH_KEY) == "true";

  }
}
