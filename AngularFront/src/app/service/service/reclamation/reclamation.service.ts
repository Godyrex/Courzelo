import { reclamation } from 'src/app/model/reclamation/reclamation';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Etat } from 'src/app/model/Etat';
import { reclamationADD } from 'src/app/model/reclamation/reclamationadd';
import { reclamationDTO } from 'src/app/model/reclamation/reclamationDTO';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseURL = 'http://localhost:8081/api/v1/reclamation';
  constructor(private http:HttpClient) {}
    getReclamationList():Observable<reclamation[]>{
      //return this.http.get<reclamation[]>(`${this.baseURL}/all`);    
      return this.http.get<reclamation[]>("/aki/api/v1/reclamation/all") ;//localhost:8081
    }
      
      updateStatus(id:any,statusId:any):any{
        return this.http.post(`${this.baseURL}/update/status/${id}/${statusId}`,null);
       }


      forwardToEmployee(id:any,idEmployee:any):Observable<HttpEvent<Object>>{
        return this.http.post<HttpEvent<any>>(`${this.baseURL}/updateEmp/${id}/${idEmployee}`, null, {
          observe: 'events' // Specify 'events' to receive events including progress events
        }).pipe(
          catchError((error: HttpErrorResponse) => {
            // Handle error
            return throwError(error);
          })
        );
            }

            getRecByDetails(sujet:string,details:string){
              return this.http.get<reclamation>(`${this.baseURL}/reclamations/details`),{params:{     
                sujet:sujet,
                details:details     
              }}
            }
  addReclamation(reclamation: reclamation): Observable<Object>{
    return this.http.post(`${this.baseURL}/add`, reclamation);
  }
  addReclamationv2(reclamation: reclamation): Observable<Object>{
    return this.http.post(`${this.baseURL}/add2`, reclamation);
  }
  addReclamationv3(reclamation: reclamationADD): Observable<Object>{
    return this.http.post(`${this.baseURL}/add`, reclamation);
  }

  addReclamationv4(reclamation: reclamation): Observable<Object>{
    return this.http.post(`${this.baseURL}/add9`, reclamation);
  }
  addReclamationv5(reclamation: reclamationDTO): Observable<Object>{
    return this.http.post(`${this.baseURL}/add8`, reclamation);
  }
  


  getReclamationById(id: string): Observable<reclamation>{
    return this.http.get<reclamation>(`${this.baseURL}/get/${id}`);
  }

  updateReclamation(reclamation: reclamation,id:string): Observable<Object>{
    return this.http.put(`${this.baseURL}/update/${id}`, reclamation);
  }

  updateReclamation1(reclamation: reclamationDTO): Observable<Object>{
    return this.http.put(`${this.baseURL}/rec`, reclamation);
  }
  deleteReclamation1(id: string): Observable<Object>{
    return this.http.delete(`${this.baseURL}/delete1/${id}`);
  }

  deleteReclamation(id: string): Observable<Object>{
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }
   
}
