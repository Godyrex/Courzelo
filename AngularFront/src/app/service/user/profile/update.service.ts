import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {JsonResponse} from "../../../model/user/JsonResponse";
import {PasswordRequest} from "../../../model/user/PasswordRequest";
import {NameRequest} from "../../../model/user/NameRequest";
import {EmailRequest} from "../../../model/user/EmailRequest";
import {map, Observable} from "rxjs";
import {DeleteAccountRequest} from "../../../model/user/DeleteAccountRequest";
import {LoginResponse} from "../../../model/user/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private baseUrl: string = 'http://localhost:8081/api/v1/user';

  constructor(private http: HttpClient) {
  }

  changePassword(passwordRequest: PasswordRequest) {
    return this.http.patch<JsonResponse>(`${this.baseUrl}/update/password`, passwordRequest)
  }

  changeEmail(emailRequest: EmailRequest) {
    return this.http.post(`${this.baseUrl}/update/email`, emailRequest);
  }

  changeName(nameRequest: NameRequest) {
    return this.http.patch<JsonResponse>(`${this.baseUrl}/update/name`, nameRequest);
  }

  sendVerificationCode(): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendVerificationCode`, null);
  }

  changePhoto(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/update/photo`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getUploadProgress(event)),
    );
  }

  getPhoto(photoId: string) {
    return this.http.get(`${this.baseUrl}/photo/${photoId}`, {responseType: 'blob'});
  }

  getMyInfo() {
    return this.http.get<LoginResponse>(`${this.baseUrl}/myInfo`);
  }

  deleteAccount(password: DeleteAccountRequest) {
    return this.http.post(`${this.baseUrl}/delete`, password);
  }

  private getUploadProgress(event: any): number | null {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round((event.loaded / event.total) * 100);
      return percentDone;
    }
    return null;
  }
}
