import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBank } from '../../models/PapssProject';
import { BaseResponse } from '../../models/BaseResponse';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddBankService {
  url = environment.baseUrl;
  constructor(private http: HttpClient) {}

  addProject(data: AddBank): Observable<BaseResponse<any>> {
    return this.http.post<BaseResponse<any>>(`${this.url}/AddProject`, data);
  }
  getProject(id: number): Observable<BaseResponse<AddBank>> {
    return this.http.get<BaseResponse<AddBank>>(
      `${this.url}/GetProject/${id}`
    );
  }
  updateProject(data: AddBank, id: number): Observable<BaseResponse<any>> {
    return this.http.put<BaseResponse<any>>(
      `${this.url}/UpdateProject/${id}`,
      data
    );
  }
}
