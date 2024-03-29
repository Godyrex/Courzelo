import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../user/auth/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  private baseUrl = 'http://localhost:8081/api/data';
  private baseUrl1 = 'http://localhost:8081/api/pdf';
  private baseUrl2 = 'http://localhost:8081/api/TimeTable';
  constructor(private http:HttpClient,private tokenStorageService:TokenStorageService) { }
  public importFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'));
    return this.http.post(this.baseUrl + '/import', formData);
  }
  public exportFile(): Observable<Blob> {
    return this.http.get(this.baseUrl1 + "/classes", { responseType: 'blob' });
  }
  public generateEmploi(): Observable<any> {
    return this.http.get(this.baseUrl2+ "/generate");
  }
  public exportFileProf(id:string): Observable<Blob> {

    return this.http.get(this.baseUrl1+ "/teachers/"+id, { responseType: 'blob' });
  }
  public exportFileClasse(id: string | undefined): Observable<Blob> {
    return this.http.get(this.baseUrl1 + "/classes/"+id, { responseType: 'blob' });
  }
  public downloadGeneratedExcelFile(): Observable<Blob> {
    return this.http.get(this.baseUrl + "/download", { responseType: 'blob' });
  }
}
