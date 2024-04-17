import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, throwError} from "rxjs";
import {Departement} from "../../model/schedule/departement";
import {FieldOfStudy} from "../../model/schedule/field-of-study";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'http://localhost:8081/api/departments';
  departments: Departement[] = [];
  private departmentsSubject = new BehaviorSubject<Departement[]>([]);
  departments$: Observable<Departement[]> = this.departmentsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  /*  public getDepartment(id: number): Observable<Departement> {
        return this.http.get<Departement>(`${environment.backendHost}//api/departements/${id}`);
    }*/
  public getAllDepartements(): Observable<Departement[]> {
    console.log('Departments:', this.departments);
    return this.http.get<Departement[]>(this.baseUrl);
  }

  addDepartment(department: Departement): void {
    const currentDepartments = this.departmentsSubject.value;
    const updatedDepartments = [...currentDepartments, department];
    this.departmentsSubject.next(updatedDepartments);
  }

  public getDepartementByID(id: string): Observable<Departement> {
    return this.http.get<Departement>(`${this.baseUrl}/${id}`);
  }

  saveDepartment(department: Departement): Observable<any> {
    return this.http.post<any>(this.baseUrl, department).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  getDepartmentCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count`);
  }

    searchDepartments(name: string): Observable<Departement[]> {
    if (!name.trim()) {
      return of([]);
    }
    const encodedName = encodeURIComponent(name);
    const url = `${this.baseUrl}/search?name=${encodedName}`;
    return this.http.get<Departement[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching departments:', error);
        return of([]);
      })
    );
  }


  deleteDepartment(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error deleting department:', error);
        return of(false);
      })
    );
  }

  public getFilieres(id: string): Observable<FieldOfStudy[]> {
    return this.http.get<FieldOfStudy[]>(`${this.baseUrl}${id}/filieres`);
  }

  public updateDepartment(id: string, department: Departement): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/${id}`, department).pipe(
      catchError((error: any) => {
        console.error('Error updating department:', error);
        return of(false);
      })
    );
  }

}
