import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public urlExam="http://localhost:8085/question"

  constructor(private httpClient:HttpClient) { }

  public getAll() :Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.urlExam);
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
  public getbyExamId(id: any):Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.urlExam+"/byExamId/" + id);
  }
}
