import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ElementModule} from "../../model/schedule/element-module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  private baseUrl = 'http://localhost:8081/api/TimeTable';
  constructor(private http:HttpClient) { }
  public getTimeTable(): Observable<ElementModule[]> {
    return this.http.get<ElementModule[]>(this.baseUrl);}

    getTimetableByProf(idProf: number) {
      return this.http.get<ElementModule[]>(this.baseUrl+ idProf);
    }
    getTimetableByClasse(classeId: number) {
      return this.http.get<ElementModule[]>(this.baseUrl + classeId);
    }
  public exportFile(): Observable<Blob> {
    // Set the response type to 'blob' to receive binary data
    return this.http.get(this.baseUrl + "/pdf/classes", { responseType: 'blob' });
  }
  public generateEmploi(): Observable<any> {
    return this.http.get(this.baseUrl + "/generate");
  }



}


