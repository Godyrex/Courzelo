import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Exams} from '../model/exams';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  public urlExam = "http://localhost:8085/exam"

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<Exams[]> {
    return this.httpClient.get<Exams[]>(this.urlExam);
  }

  public edit(id: any, data: any): Observable<void> {
    return this.httpClient.put<void>(this.urlExam, data);
  }

  public add(data: any): Observable<void> {
    return this.httpClient.post<void>(this.urlExam, data);
  }

  public delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.urlExam + "/" + id);
  }
}
