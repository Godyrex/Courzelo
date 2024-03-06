import { Injectable } from '@angular/core';
import {Departement} from "../../model/schedule/departement";
import {BehaviorSubject, catchError, Observable, of, throwError} from "rxjs";
import {NonDisponibility} from "../../model/schedule/non-disponibility";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FieldOfStudy} from "../../model/schedule/field-of-study";

@Injectable({
  providedIn: 'root'
})
export class NonDisponibilityService {
  private baseUrl = 'http://localhost:8081/api/nonDisponibilities';
  nonDisponibilities: NonDisponibility[] = [];
  private nonDisponibilitiesSubject = new BehaviorSubject<NonDisponibility[]>([]);
  nonDisponibilities$: Observable<NonDisponibility[]> = this.nonDisponibilitiesSubject.asObservable();


  constructor(private http: HttpClient) { }
  public getAllNDB(): Observable<NonDisponibility[]> {
    console.log('Departments:', this.nonDisponibilities);
    return this.http.get<NonDisponibility[]>(this.baseUrl);
  }

  addNDB(nonDisponibilities: NonDisponibility): void {
    const currentNdb = this.nonDisponibilitiesSubject.value;
    const updatedNdb = [...currentNdb, nonDisponibilities];
    this.nonDisponibilitiesSubject.next(updatedNdb);
  }
  public getNdbByID(id: string): Observable<NonDisponibility> {
    return this.http.get<NonDisponibility>(`${this.baseUrl}/${id}`);
  }

    saveNdb(nonDisponibilities: NonDisponibility): Observable<any> {
    return this.http.post<any>(this.baseUrl, nonDisponibilities).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );}
  getDepartmentCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count`);
  }

  searchNdb(day: string): Observable<NonDisponibility[]> {
    if (day.trim()) {
      return of([]);
    }
    const encodedName = encodeURIComponent(day);
    const url = `${this.baseUrl}/search?day=${encodedName}`;
    return this.http.get<NonDisponibility[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching departments:', error);
        return of([]);
      })
    );
  }


  deleteNdb(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error deleting Non Disponibility:', error);
        return of(false);
      })
    );
  }

  public updateNdb(id:string, nonDisponibility: NonDisponibility): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/${id}`, nonDisponibility).pipe(
      catchError((error: any) => {
        console.error('Error updating Non disponibility:', error);
        return of(false);
      })
    );
  }
}
