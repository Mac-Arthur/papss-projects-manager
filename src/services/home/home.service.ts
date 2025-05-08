import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../models/BaseResponse';
import { GetBank } from '../../models/PapssProject';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  url = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getProjects(): Observable<BaseResponse<GetBank[]>> {
    return this.http.get<BaseResponse<GetBank[]>>(
      `${this.url}/GetProjects`
    );
  }

  getProject(id: number): Observable<BaseResponse<GetBank>> {
    return this.http.get<BaseResponse<GetBank>>(
      `${this.url}/GetProject/${id}`
    );
  }

  addProject(formData: FormData): Observable<BaseResponse<any>> {
    return this.http.post<BaseResponse<any>>(
      `${this.url}/AddProject`,
      formData
    );
  }

  updateProject(formData: FormData, id: number): Observable<BaseResponse<any>> {
    return this.http.put<BaseResponse<any>>(
      `${this.url}/UpdateProject/${id}`,
      formData
    );
  }
}
