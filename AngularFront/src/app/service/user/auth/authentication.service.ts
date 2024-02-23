import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../../../model/RegisterRequest";
import {JsonResponse} from "../../../model/user/JsonResponse";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {LoginRequest} from "../../../model/user/LoginRequest";
import {RefreshTokenRequest} from "../../../model/user/RefreshTokenRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl : string = 'http://localhost:8081/api/v1/auth';
  constructor(private http: HttpClient) { }
  register(registerRequest : RegisterRequest)  {
    return this.http.post<JsonResponse>(`${this.baseUrl}/signup`,registerRequest)
  }
  login(loginRequest : LoginRequest){
    return this.http.post<LoginResponse>(`${this.baseUrl}/signing`,loginRequest);
  }
  refreshToken(refreshTokenRequest : RefreshTokenRequest){
    return this.http.post<LoginResponse>(`${this.baseUrl}/refreshToken`,refreshTokenRequest);
  }
}
