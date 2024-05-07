import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vote } from '../models/vote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
public  url='http://localhost:8081/vote';
constructor(private httpClient:HttpClient) { }

public getAll(): Observable<Vote []> {
  return this.httpClient.get<Vote []>(this.url);

}

public edit(data: Comment): Observable<Vote> {
  return this.httpClient.put<Vote>(this.url, data);

}

public add(data: any) {
  return this.httpClient.post(this.url, data);
}

public findById(id: any): Observable<Vote> {
  return this.httpClient.get<Vote>(this.url + id);
}


public delete(id: any,idPost:any):Observable<string> {
  return this.httpClient.delete<string>(this.url +'/'+ id+'/'+idPost);
}

public getLikeVote(idComment:string): Observable<number> {
  return this.httpClient.get<number>(this.url+'/'+1+'/'+idComment);
}

public getDislikeVote(idComment:string): Observable<number> {
  return this.httpClient.get<number>(this.url+'/'+2+'/'+idComment);
}

}
