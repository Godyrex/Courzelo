import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JsonResponse} from "../../../model/user/JsonResponse";
import {PasswordRequest} from "../../../model/user/PasswordRequest";
import {NameRequest} from "../../../model/user/NameRequest";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private baseUrl : string = 'http://localhost:8081/api/v1/user';
  constructor(private http: HttpClient) { }
  changePassword(passwordRequest : PasswordRequest)  {
    return this.http.patch<JsonResponse>(`${this.baseUrl}/update/password`,passwordRequest)
  }
 /* changeEmail(emailRequest : EmailRequest){
    return this.http.post<JsonResponse>(`${this.baseUrl}/signing`,loginRequest);
  }*/
  changeName(nameRequest : NameRequest){
    return this.http.patch<JsonResponse>(`${this.baseUrl}/update/name`,nameRequest);
  }
}
