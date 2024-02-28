import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserResponse} from "../../../model/user/UserResponse";
import {UserRoleRequest} from "../../../model/user/UserRoleRequest";

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private baseUrl : string = 'http://localhost:8081/api/v1/admin';
  constructor(private http: HttpClient) { }
  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}/users`);
  }
  addRole(userRoleRequest : UserRoleRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${userRoleRequest.userID}/${userRoleRequest.role}`, null);
  }
  removeRole(userRoleRequest : UserRoleRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/remove/${userRoleRequest.userID}/${userRoleRequest.role}`, null);
  }
  toggleBan(userRoleRequest : UserRoleRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/ban/${userRoleRequest.userID}`, null);
  }
  toggleEnable(userRoleRequest : UserRoleRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/enable/${userRoleRequest.userID}`, null);
  }
}
