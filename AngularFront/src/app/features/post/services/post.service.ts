import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url:any ="http://localhost:8085/post";

  constructor(public httpClient: HttpClient) { }

  public getAll(): Observable<Post []> {
    return this.httpClient.get<Post []>(this.url);

  }

  public edit(data: Post): Observable<Post> {
    return this.httpClient.put<Post>(this.url, data);

  }

  public add(data: any) {
    return this.httpClient.post(this.url , data);
  }

  public findById(id: any): Observable<Post> {
    return this.httpClient.get<Post>(this.url + id);
  }


  public delete(id: any):Observable<string> {
    return this.httpClient.delete<string>(this.url +'/'+ id);
  }
 


}
