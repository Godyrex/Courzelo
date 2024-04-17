import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../../comment/models/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url:any ="http://localhost:8085/post";
  userUrl:any ="http://localhost:8085/api/v1/user/";

  constructor(public httpClient: HttpClient) { }

  public getAll(): Observable<Post []> {
    return this.httpClient.get<Post []>(this.url);

  }

  public edit(data: Post): Observable<Post> {
    return this.httpClient.put<Post>(this.url, data);

  }

  public add(data: any):Observable<Post> {
    return this.httpClient.post<Post>(this.url , data);
  }

  public findById(id: any): Observable<Post> {
    return this.httpClient.get<Post>(this.url + id);
  }


  public delete(id: any):Observable<string> {
    return this.httpClient.delete<string>(this.url +'/'+ id);
  }

  public addImagePost(postUid: any, photo: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('img', photo); // Utilisez le nom 'media' ici
    const req = new HttpRequest('PUT', this.url + '/img/' + postUid, formData,
      {
        reportProgress: true,
        responseType: 'blob' // Par défaut, configurez-le sur 'blob'
      });
      return this.httpClient.request(req);
  }

  public findUserById(id: any): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + id);
  }

}
