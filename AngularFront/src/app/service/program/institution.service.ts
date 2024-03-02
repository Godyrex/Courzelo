import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {InstitutionDTO} from "../../model/program/InstitutionDTO";
import {UserResponse} from "../../model/user/UserResponse";
import {InstitutionListDTO} from "../../model/program/InstitutionListDTO";
import {UserListDTO} from "../../model/user/UserListDTO";

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private baseUrl = 'http://localhost:8081/api/v1/institution';

  constructor(private http: HttpClient) { }
  getInstitutionAdmins(institutionID: string,page: number, itemsPerPage: number): Observable<UserListDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());
    return this.http.get<UserListDTO>(`${this.baseUrl}/${institutionID}/admins`);
  }
  getInstitutionTeachers(institutionID: string,page: number, itemsPerPage: number): Observable<UserListDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());
    return this.http.get<UserListDTO>(`${this.baseUrl}/${institutionID}/teachers`);
  }
  getInstitutionStudent(institutionID: string,page: number, itemsPerPage: number): Observable<UserListDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());
    return this.http.get<UserListDTO>(`${this.baseUrl}/${institutionID}/students`);
  }
  getAllInstitutions(): Observable<InstitutionDTO[]> {
    return this.http.get<InstitutionDTO[]>(`${this.baseUrl}/all`);
  }

  addInstitution(institution: InstitutionDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add`, institution);
  }

  getInstitutionById(institutionID: string): Observable<InstitutionDTO> {
    return this.http.get<InstitutionDTO>(`${this.baseUrl}/get/${institutionID}`);
  }

  getInstitutionForAdmin(): Observable<InstitutionDTO> {
    return this.http.get<InstitutionDTO>(`${this.baseUrl}/`);
  }

  deleteInstitution(institutionID: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${institutionID}`);
  }

  updateInstitution(institution: InstitutionDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/update`, institution);
  }
  addAdmin(institutionId: string, userEmail: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add/admin/${institutionId}/${userEmail}`, null);
  }
  addTeacher(institutionId: string, userEmail: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add/teacher/${institutionId}/${userEmail}`, null);
  }
  addStudent(institutionId: string, userEmail: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add/student/${institutionId}/${userEmail}`, null);
  }
  addUser(role: string, userEmail: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add/user/${userEmail}/${role}`, null);
  }
  removeUser(institutionID: string, userEmail: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/remove/user/${institutionID}/${userEmail}`, null);
  }
  getPaginatedInstitution(page: number, itemsPerPage: number): Observable<InstitutionListDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());

    return this.http.get<InstitutionListDTO>(`${this.baseUrl}/all`, { params });
  }
}
