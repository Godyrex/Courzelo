import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Departement} from "../../model/schedule/departement";
import {Modul} from "../../model/schedule/Modul";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseUrl = ' http://localhost:8081/api/Modules';
  Modules:Modul[]=[];
  constructor(private http: HttpClient) { }
  public getAllModules(): Observable<Modul[]> {
    return this.http.get<Modul[]>(this.baseUrl);
  }
  public getModule(id: string): Observable<Modul> {
    return this.http.get<Modul>(`${this.baseUrl}/${id}`);
  }
}
