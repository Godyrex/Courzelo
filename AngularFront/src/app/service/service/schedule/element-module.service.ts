import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ElementModule} from "../../model/schedule/element-module";

@Injectable({
  providedIn: 'root'
})
export class ElementModuleService {
  elementModules: ElementModule[] = [];
  private baseUrl = 'http://localhost:8081/api/elementModules';

  constructor(private http: HttpClient) {
  }

  public saveElementModule(elementModule: ElementModule): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}` + "/create", elementModule);
  }

  public getElementModuleByID(id: string): Observable<ElementModule> {
    return this.http.get<ElementModule>(`${this.baseUrl}/${id}`);
  }
  public getAllElementModules(): Observable<ElementModule[]> {
    console.log('ElementModules:', this.elementModules);
    return this.http.get<ElementModule[]>(this.baseUrl);
  }

  public getElementModuleCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count`);
  }

  public searchElementModules(name: string): Observable<ElementModule[]> {
    if (!name.trim()) {
      return new Observable<ElementModule[]>();
    }
    const encodedName = encodeURIComponent(name);
    const url = `${this.baseUrl}/search?name=${encodedName}`;
    return this.http.get<ElementModule[]>(url);
  }

  public deleteElementModule(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  public updateElementModule(elementModule: ElementModule): Observable<any> {
    return this.http.put<any>(this.baseUrl, elementModule);
  }

  public getEnums(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/enums`);
  }


}


