import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserListDTO} from "../../model/user/UserListDTO";
import {ClassDTO} from "../../model/program/ClassDTO";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private baseUrl = 'http://localhost:8081/api/v1/class';

  constructor(private http: HttpClient) {
  }

  addUserToClass(classID: string, role: string, userEmail: string): Observable<boolean> {
    const params = new HttpParams()
      .set('id', classID)
    return this.http.post<boolean>(`${this.baseUrl}/add/user/${userEmail}/${role}`, null, {params});
  }
  getMyClass():Observable<ClassDTO>{
    return this.http.get<ClassDTO>(`${this.baseUrl}/myClass`);
  }

  removeUserFromClass(classID: string, userEmail: string): Observable<boolean> {
    const params = new HttpParams()
      .set('classID', classID)
    return this.http.post<boolean>(`${this.baseUrl}/remove/user/${userEmail}`, null, {params});
  }

  getClassUsers(classID: string, role: string, page: number, itemsPerPage: number): Observable<UserListDTO> {
    const params = new HttpParams()
      .set('classID', classID)
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());
    return this.http.get<UserListDTO>(`${this.baseUrl}/getClassUsers/${role}`, {params});
  }

  updateClass(classDTO: ClassDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/update`, classDTO);
  }
  searchClassesSem(semesterId: string, page: string, size: number): Observable<ClassDTO[]> {
    const params = new HttpParams()
      .set('semesterId', semesterId)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ClassDTO[]>(`${this.baseUrl}/searchBySemester`, {params});
  }
  getClasses():Observable<UserListDTO>{
    return  this.http.get<UserListDTO>(`${this.baseUrl}/all`);
  }
}
