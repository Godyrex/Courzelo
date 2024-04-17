import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../../model/user/LoginRequest";
import {Observable} from "rxjs";
import {RecoverPasswordRequest} from "../../../model/user/RecoverPasswordRequest";
import {RegisterRequest} from "../../../model/RegisterRequest";
import {JsonResponse} from "../../../model/user/JsonResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:8081/api/v1/auth';

  constructor(private http: HttpClient) {
  }

  register(registerRequest: RegisterRequest) {
    return this.http.post<JsonResponse>(`${this.baseUrl}/signup`, registerRequest)
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signing`, loginRequest);
  }

  verifyAccount(code: string) {
    return this.http.get<JsonResponse>(`${this.baseUrl}/verify?code=${code}`);
  }

  forgotPassword(email: string) {
    return this.http.post<JsonResponse>(`${this.baseUrl}/forgot-password?email=${email}`, null);
  }

  recoverPassword(token: string, password: RecoverPasswordRequest) {
    return this.http.post<JsonResponse>(`${this.baseUrl}/recover-password?token=${token}`, password);
  }

  confirmDevice(loginRequest: LoginRequest, code: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/confirmDevice/${code}`, loginRequest);
  }

  isAuthenticated() {
    return this.http.get<boolean>(`${this.baseUrl}/isAuthenticated`);
  }

  getRole() {
    return this.http.get<string[]>(`${this.baseUrl}/getRole`);
  }
  generateTwoFactorAuthQrCode(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/generateTwoFactorAuthQrCode`, null);
  }

  enableTwoFactorAuth(verificationCode: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/enableTwoFactorAuth?verificationCode=${verificationCode}`, null);
  }

  disableTwoFactorAuth(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/disableTwoFactorAuth`, null);
  }
  loginTFA(loginRequest: LoginRequest, verificationCode: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signingTFA?verificationCode=${verificationCode}`, loginRequest);
  }

  verifyTwoFactorAuth( verificationCode: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verifyTwoFactorAuth?verificationCode=${verificationCode}`, null);
  }
}
