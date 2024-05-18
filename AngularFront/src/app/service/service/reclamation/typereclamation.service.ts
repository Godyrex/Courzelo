import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { typereclamation } from 'src/app/model/reclamation/typereclamation';

@Injectable({
  providedIn: 'root'
})
export class TypereclamationService {
   //http://localhost:8081/api/v1/typereclamation
  private baseURL = 'http://localhost:8081/api/typereclamation';
  constructor(private http:HttpClient) {}
    getTypeList():Observable<typereclamation[]>{
      return this.http.get<typereclamation[]>(`${this.baseURL}/all`);    }

  addType(typereclamation: typereclamation): Observable<Object>{
    return this.http.post(`${this.baseURL}/add`, typereclamation);
  }

  getTypeId(id: string): Observable<typereclamation>{
    return this.http.get<typereclamation>(`${this.baseURL}/get/${id}`);
  }

  updateType(typereclamation: typereclamation): Observable<Object>{
    return this.http.put(`${this.baseURL}/update`, typereclamation);
  }

  addTrello(data:any):any{
    return this.http.post(`${this.baseURL}/trello/add`,data);
    } 

  deleteType(id: string): Observable<Object>{
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }
   
}
