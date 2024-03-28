import {Injectable} from '@angular/core';
import {LoginResponse} from "../../../model/user/LoginResponse";
import {UserResponse} from "../../../model/user/UserResponse";

const USER_KEY = 'auth-user';
const AUTH_KEY = 'authentication';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private USER_RESPONSE_KEY = 'userResponse';

  signOut(): void {
    window.localStorage.clear();
  }


  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.localStorage.setItem(AUTH_KEY, "true");
  }

  public getUser(): LoginResponse {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isAuthenticated(): boolean {
    return window.localStorage.getItem(AUTH_KEY) == "true";

  }
  saveUserResponse(userResponse: UserResponse) {
    window.sessionStorage.removeItem(this.USER_RESPONSE_KEY);
    window.sessionStorage.setItem(this.USER_RESPONSE_KEY, JSON.stringify(userResponse));
  }

  getUserResponse(): UserResponse | null {
    const userResponse = window.sessionStorage.getItem(this.USER_RESPONSE_KEY);
    return userResponse ? JSON.parse(userResponse) : null;
  }
}
