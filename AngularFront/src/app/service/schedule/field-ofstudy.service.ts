import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, throwError} from "rxjs";
import {FieldOfStudy} from "../../model/schedule/field-of-study";

import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Departement} from "../../model/schedule/departement";


@Injectable({
  providedIn: 'root'
})
export class FieldOfstudyService {
  private baseUrl = 'http://localhost:8081/api/fieldOfStudies';
  private fieldsSubject = new BehaviorSubject<FieldOfStudy[]>([]);
fields: FieldOfStudy[] = [];

  constructor(private http:HttpClient) { }
  getAllFilieres(): Observable<FieldOfStudy[]> {
    console.log('Fetching field of studies...');
    return this.http.get<FieldOfStudy[]>(this.baseUrl); // Use http.get with FieldOfStudy[] type
  }

  saveFieldOfStudy(fieldOfStudy: FieldOfStudy): Observable<FieldOfStudy> {
    return this.http.post<FieldOfStudy>(this.baseUrl, fieldOfStudy)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }
  searchFields(name: string): Observable<FieldOfStudy[]> {
    if (!name.trim()) {
      return of([]);
    }
    const encodedName = encodeURIComponent(name);
    const url = `${this.baseUrl}/search?name=${encodedName}`;
    return this.http.get<FieldOfStudy[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching field:', error);
        return of([]);
      })
    );
  }

  deleteField(id: string | undefined): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error deleting field:', error);
        return of(false);
      })
    );
  }
  public updateField(id: string | undefined, field: FieldOfStudy): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/${id}`, field).pipe(
      catchError((error: any) => {
        console.error('Error updating field:', error);
        return of(false);
      })
    );
  }


}
