import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ElementModule} from "../../model/schedule/element-module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  private baseUrl = 'http://localhost:8081/api/TimeTable';

  constructor(private http: HttpClient) {
  }

  public getEmplois(): Observable<ElementModule[]> {
    return this.http.get<ElementModule[]>(`${this.baseUrl}`);
  }
  getEmploiByProf(id: string) {
    return this.http.get<ElementModule[]>(`${this.baseUrl}` + "/prof" + id);
  }

  getEmploisByClasse(id: string | undefined) {
    return this.http.get<ElementModule[]>(`${this.baseUrl}` + id);
  }


}


