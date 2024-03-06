import { reclamation } from './../../model/reclamation/reclamation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseURL = 'http://localhost:8081/api/v1/reclamation';
  constructor(private http:HttpClient) {}
    getReclamationList():Observable<reclamation[]>{
      return this.http.get<reclamation[]>(`${this.baseURL}/all`);    }

  addReclamation(reclamation: reclamation): Observable<Object>{
    return this.http.post(`${this.baseURL}`, reclamation);
  }

  getReclamationById(id: string): Observable<reclamation>{
    return this.http.get<reclamation>(`${this.baseURL}/get/${id}`);
  }

  updateReclamation(reclamation: reclamation): Observable<Object>{
    return this.http.put(`${this.baseURL}/update`, reclamation);
  }

  deleteReclamation(id: string): Observable<Object>{
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }
   
}
