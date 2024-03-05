import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeviceListDTO} from "../../../model/user/DeviceListDTO";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private baseUrl: string = 'http://localhost:8081/api/v1/user';

  constructor(private http: HttpClient) {
  }

  getDevices(page: number, itemsPerPage: number): Observable<DeviceListDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());
    return this.http.get<DeviceListDTO>(`${this.baseUrl}/devices`, {params});
  }
  deleteDevice(id: string) {
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(`${this.baseUrl}/delete/device`, {params});
  }
}
