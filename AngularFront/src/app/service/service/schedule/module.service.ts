import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Departement} from "../../model/schedule/departement";
import {Modul} from "../../model/schedule/Modul";
import {PredictModule} from "../../model/schedule/PredictModule";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseUrl = ' http://localhost:8081/api/Modules';
  Modules:Modul[]=[];
  constructor(private http: HttpClient) { }
  public getAllModules(): Observable<Modul[]> {
    console.log('Fetching Modules...',this.Modules);
    return this.http.get<Modul[]>(this.baseUrl);
  }
  public getModule(id: string): Observable<Modul> {
    return this.http.get<Modul>(`${this.baseUrl}/${id}`);
  }

  predictPopularity(programID:string): Observable<any> {
    return this.http.post(`http://localhost:8081/api/v1/program/predictPopularity?programID=${programID}`, {});
  }
}
