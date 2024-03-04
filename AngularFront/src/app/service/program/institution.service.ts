import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {InstitutionDTO} from "../../model/program/InstitutionDTO";
import {InstitutionListDTO} from "../../model/program/InstitutionListDTO";
import {UserListDTO} from "../../model/user/UserListDTO";
import {InstitutionUsersCountDTO} from "../../model/program/institutionUsersCountDTO";

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private baseUrl = 'http://localhost:8081/api/v1/institution';

  constructor(private http: HttpClient) {
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

  countUsers(): Observable<InstitutionUsersCountDTO> {
    return this.http.get<InstitutionUsersCountDTO>(`${this.baseUrl}/countUsers`);
  }

  deleteInstitution(institutionID: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${institutionID}`);
  }

  updateInstitution(institution: InstitutionDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/update`, institution);
  }

  updateMyInstitution(institution: InstitutionDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/updateMine`, institution);
  }

  addUserToInstitution(institutionID: string, role: string, userEmail: string): Observable<boolean> {
    const params = new HttpParams()
      .set('institutionID', institutionID)
    return this.http.post<boolean>(`${this.baseUrl}/add/user/${userEmail}/${role}`, null,{params});
  }

  removeUserFromInstitution(institutionID: string, userEmail: string): Observable<boolean> {
    const params = new HttpParams()
      .set('institutionID', institutionID)
    return this.http.post<boolean>(`${this.baseUrl}/remove/user/${userEmail}`, null,{params});
  }

  getInstitutionUsers(institutionID: string, role: string, page: number, itemsPerPage: number): Observable<UserListDTO> {
    const params = new HttpParams()
      .set('institutionID', institutionID)
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());
    return this.http.get<UserListDTO>(`${this.baseUrl}/getInstitutionUsers/${role}`, {params});
  }

  getPaginatedInstitution(page: number, itemsPerPage: number): Observable<InstitutionListDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());

    return this.http.get<InstitutionListDTO>(`${this.baseUrl}/all`, {params});
  }

  getMyInstitution(): Observable<InstitutionDTO> {
    return this.http.get<InstitutionDTO>(`${this.baseUrl}/getMyInstitution`);
  }
}
