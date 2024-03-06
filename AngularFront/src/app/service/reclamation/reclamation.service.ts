import { reclamation } from 'src/app/model/reclamation/reclamation';
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
    return this.http.post(`${this.baseURL}/add`, reclamation);
  }


  getReclamationById(id: string): Observable<reclamation>{
    return this.http.get<reclamation>(`${this.baseURL}/get/${id}`);
  }

  updateReclamation(reclamation: reclamation): Observable<Object>{
    return this.http.put(`${this.baseURL}/update`, reclamation);
  }

  updateReclamation1(reclamation: reclamation): Observable<Object>{
    return this.http.put(`${this.baseURL}/rec`, reclamation);
  }
  deleteReclamation1(id: string): Observable<Object>{
    return this.http.delete(`${this.baseURL}/delete1/${id}`);
  }

  deleteReclamation(id: string): Observable<Object>{
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }
   
}
