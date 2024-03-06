import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../models/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  url:any ="http://localhost:8085/progam";

  constructor(public httpClient: HttpClient) { }

  public getAll(): Observable<Program []> {
    return this.httpClient.get<Program []>(this.url);

  }

  public edit(data: Program): Observable<Program> {
    return this.httpClient.put<Program>(this.url, data);

  }

  public add(data: any) {
    return this.httpClient.post(this.url , data);
  }

  public findById(id: any): Observable<Program> {
    return this.httpClient.get<Program>(this.url + id);
  }


  public delete(id: any):Observable<string> {
    return this.httpClient.delete<string>(this.url +'/'+ id);
  }
 


}
