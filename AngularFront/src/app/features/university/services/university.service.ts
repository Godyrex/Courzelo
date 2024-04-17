import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { University } from '../models/university';
@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  url:any ="http://localhost:8085/university";

  constructor(public httpClient: HttpClient) { }

  public getAll(): Observable<University []> {
    return this.httpClient.get<University []>(this.url);

  }

  public edit(data: University): Observable<University> {
    return this.httpClient.put<University>(this.url, data);

  }

  public add(data: any) {
    return this.httpClient.post(this.url , data);
  }

  public findById(id: any): Observable<University> {
    return this.httpClient.get<University>(this.url + id);
  }


  public delete(id: any):Observable<string> {
    return this.httpClient.delete<string>(this.url +'/'+ id);
  }



}
