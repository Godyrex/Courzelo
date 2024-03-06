import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
public urlCourse="http://localhost:8085/cours"
constructor(private httpClient:HttpClient) { }

public getAll() :Observable<Course[]> {
  return this.httpClient.get<Course[]>(this.urlCourse);
}

public edit(id: any, data: any): Observable<void> {
  return this.httpClient.put<void>(this.urlCourse, data);
}
public  add(data: any): Observable<void> {
  return this.httpClient.post<void>(this.urlCourse, data);
}

public delete(id: any):Observable<any> {
  return this.httpClient.delete<any>(this.urlCourse+"/" + id);
}

}
