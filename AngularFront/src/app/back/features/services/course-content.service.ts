import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CourseContent} from '../model/course-content';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  public urlCourse = "http://localhost:8085/coursContet"

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<CourseContent[]> {
    return this.httpClient.get<CourseContent[]>(this.urlCourse);
  }

  public edit(id: any, data: any): Observable<void> {
    return this.httpClient.put<void>(this.urlCourse, data);
  }

  public add(data: any): Observable<void> {
    return this.httpClient.post<void>(this.urlCourse, data);
  }

  public delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.urlCourse + "/" + id);
  }

  public getByIdCourses(id: any): Observable<CourseContent[]> {
    return this.httpClient.get<CourseContent[]>(this.urlCourse + "/" + id);
  }

}
