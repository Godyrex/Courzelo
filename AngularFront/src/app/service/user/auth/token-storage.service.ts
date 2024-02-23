import { Injectable } from '@angular/core';
import {LoginResponse} from "../../../model/user/LoginResponse";
import {UpdateService} from "../profile/update.service";
import {FormBuilder} from "@angular/forms";
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

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public saveAccesToken(accesToken: string): void {
    window.localStorage.removeItem(ACCES_TOKEN_KEY);
    window.localStorage.setItem(ACCES_TOKEN_KEY, accesToken);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public getAccessToken(): string | null {
    return window.localStorage.getItem(ACCES_TOKEN_KEY);
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
