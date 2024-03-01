import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {FieldOfStudy} from "../../model/schedule/field-of-study";

import {HttpClient, HttpErrorResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class FieldOfstudyService {
  private baseUrl = 'http://localhost:8081/api/fieldOfStudies';

  constructor(private http:HttpClient) { }
  public getAllFilieres(): Observable<FieldOfStudy> {
    return this.http.get<FieldOfStudy>(this.baseUrl);
  }
  public saveFieldOfStudy(fieldOfStudy: FieldOfStudy): Observable<FieldOfStudy> {
    return this.http.post<FieldOfStudy>(this.baseUrl, fieldOfStudy).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error occurred:', error);
      return throwError(error);
    })
    );}
}
