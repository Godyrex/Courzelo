import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ElementModuleService {
  private baseUrl = 'http://localhost:8081/api/departments';

  constructor(private http: HttpClient) { }
  getEnums(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/enums`);
  }
}
