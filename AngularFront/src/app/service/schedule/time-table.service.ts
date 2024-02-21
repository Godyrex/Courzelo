import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  private apiUrl = '/api/days';

  constructor(private http: HttpClient) {
  }

  getDaysOfWeek(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }


}


