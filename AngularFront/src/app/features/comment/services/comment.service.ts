import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../comment/models/comment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url:any ="http://localhost:8085/commentaire";

  constructor(public httpClient: HttpClient) { }

  public getAll(): Observable<Comment []> {
    return this.httpClient.get<Comment []>(this.url);

  }

  public edit(data: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(this.url, data);

  }

  public add(data: any,idPost:any) {
    return this.httpClient.post(this.url+'/'+ idPost , data);
  }

  public findById(id: any): Observable<Comment> {
    return this.httpClient.get<Comment>(this.url + id);
  }


  public delete(id: any,idPost:any):Observable<string> {
    return this.httpClient.delete<string>(this.url +'/'+ id+'/'+idPost);
  }



}
