import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ClassListDTO} from "../../model/program/ClassListDTO";
import {ProgramDTO} from "../../model/program/ProgramDTO";
import {ProgramListDTO} from "../../model/program/ProgramListDTO";
import {ClassDTO} from "../../model/program/ClassDTO";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private baseUrl = 'http://localhost:8081/api/v1/program';

  constructor(private http: HttpClient) {
  }
  //**********************************************************************
  predictProgram(): Observable<ProgramDTO> {
    return this.http.get<ProgramDTO>(`${this.baseUrl}/get/ProgramSuggestion`,);
  }
  addProgram(program: ProgramDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/add`, program);
  }
  updateProgram(program: ProgramDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/update`, program);
  }

  deleteProgram(programID: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete/${programID}`);
  }

  getProgramClasses(programID: string, page: number, itemsPerPage: number): Observable<ClassListDTO> {
    const params = new HttpParams()
      .set('program', programID)
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());
    return this.http.get<ClassListDTO>(`${this.baseUrl}/getProgramClasses`, {params});
  }

  getPaginatedPrograms(page: number, itemsPerPage: number): Observable<ProgramListDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());

    return this.http.get<ProgramListDTO>(`${this.baseUrl}/all`, {params});
  }

  addClassToProgram(programID: string, classe: ClassDTO): Observable<boolean> {
    const params = new HttpParams().set('program', programID);
    return this.http.post<boolean>(`${this.baseUrl}/add/class`, classe, {params});
  }

  removeClassFromProgram(classID: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/remove/class/${classID}`, null);
  }
  getMyPrograms(): Observable<ProgramListDTO> {
    return this.http.get<ProgramListDTO>(`${this.baseUrl}/myPrograms`);
  }
  joinProgram(key: string): Observable<boolean> {
    const params = new HttpParams()
      .set('key', key);
    return this.http.post<boolean>(`${this.baseUrl}/join`, null, {params});
  }
  joinProgramByID(id: string): Observable<boolean> {
    const params = new HttpParams()
      .set('id', id);
    return this.http.post<boolean>(`${this.baseUrl}/joinByID`, null, {params});
  }
  leaveProgram(programID: string): Observable<boolean> {
    const params = new HttpParams()
      .set('program', programID);
    return this.http.post<boolean>(`${this.baseUrl}/leave`, null, {params});
  }
  getProgramByClassID(classID: string): Observable<ProgramDTO> {
    return this.http.get<ProgramDTO>(`${this.baseUrl}/get/${classID}`);
  }
}
