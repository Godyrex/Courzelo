import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grades } from '../model/grades';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

public urlExam="http://localhost:8085/grades"

constructor(private httpClient:HttpClient) { }

public getAll() :Observable<Grades[]> {
  return this.httpClient.get<Grades[]>(this.urlExam);
}

public edit(id: any, data: any): Observable<void> {
  return this.httpClient.put<void>(this.urlExam, data);
}
public  add(data: any): Observable<void> {
  return this.httpClient.post<void>(this.urlExam, data);
}

public delete(id: any):Observable<any> {
  return this.httpClient.delete<any>(this.urlExam+"/" + id);
}
public getbyExamId(id: any):Observable<Grades[]> {
  return this.httpClient.get<Grades[]>(this.urlExam+"/byExamId/" + id);
}
}
