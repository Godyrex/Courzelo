import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Departement} from "../../model/schedule/departement";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    private baseUrl = 'http://localhost:8081/api/departements';


  constructor(private http: HttpClient) { }
  /*  public getDepartment(id: number): Observable<Departement> {
        return this.http.get<Departement>(`${environment.backendHost}//api/departements/${id}`);
    }*/
    public getAllDepartements(): Observable<Departement> {
        return this.http.get<Departement>(this.baseUrl);
    }
    public saveDepartment(department: Departement): Observable<Departement> {
        return this.http.post<Departement>(this.baseUrl, department);
    }

}
