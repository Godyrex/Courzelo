import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Assignement} from '../model/assignement';

@Injectable({
  providedIn: 'root'
})
export class AssignementService {
  public urlAssignement = "http://localhost:8085/assignement"

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<Assignement[]> {
    return this.httpClient.get<Assignement[]>(this.urlAssignement);
  }

  public edit(id: any, data: any): Observable<void> {
    return this.httpClient.put<void>(this.urlAssignement, data);
  }

  public add(data: any): Observable<void> {
    return this.httpClient.post<void>(this.urlAssignement, data);
  }

  public delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.urlAssignement + "/" + id);
  }

  getAssignementByCourse(courseId: any): Observable<Assignement[]> {
    return this.httpClient.get<Assignement[]>(this.urlAssignement + "/Bycourse/" + courseId);
  }

}
