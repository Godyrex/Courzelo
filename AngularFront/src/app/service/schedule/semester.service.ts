import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Departement} from "../../model/schedule/departement";
import {HttpClient} from "@angular/common/http";
import {FieldOfStudy} from "../../model/schedule/field-of-study";
import {Semester} from "../../model/schedule/semester";

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  semesters: Semester[] = [];
  private baseUrl = 'http://localhost:8081/api/semesters';
  private semestersSubject = new BehaviorSubject<Semester[]>([]);
  semester$: Observable<Semester[]> = this.semestersSubject.asObservable();
  constructor(private http: HttpClient) { }
  public getAllSemesters(): Observable<Semester[]> {
    console.log('Semesters:', this.semesters);
    return this.http.get<Semester[]>(this.baseUrl);
  }
}
