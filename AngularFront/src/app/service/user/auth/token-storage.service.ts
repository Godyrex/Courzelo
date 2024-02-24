import {Injectable} from '@angular/core';
import {LoginResponse} from "../../../model/user/LoginResponse";

const TOKEN_KEY = 'token';
const ACCES_TOKEN_KEY = 'access-token';
const USER_KEY = 'auth-user';
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
  }

  public getUser(): LoginResponse {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
