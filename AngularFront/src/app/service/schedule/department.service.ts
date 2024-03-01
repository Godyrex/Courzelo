import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Departement} from "../../model/schedule/departement";
import {environment} from "../../../environment/environment";
import {JsonResponse} from "../../model/user/JsonResponse";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    private baseUrl = 'http://localhost:8081/api/departments';


  constructor(private http: HttpClient) { }
  /*  public getDepartment(id: number): Observable<Departement> {
        return this.http.get<Departement>(`${environment.backendHost}//api/departements/${id}`);
    }*/
    public getAllDepartements(): Observable<Departement[]> {
        return this.http.get<Departement[]>(this.baseUrl);
    }
  saveDepartment(department: Departement): Observable<JsonResponse> {
    return this.http.post<JsonResponse>(this.baseUrl, department).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );}
  getDepartmentCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count`);
  }

}
