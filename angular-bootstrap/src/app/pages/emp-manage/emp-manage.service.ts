import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class EmpManageService {
  constructor(private http: HttpClient) {}

  query(): Observable<HttpResponse<any>> {
    const requestURL = environment.baseUrl + '/employees';
    return this.http.get<any>(requestURL, {
      observe: 'response'
    }).map((res:any)=> {
      return res.body;
    });
  }

  /* 获取公司 */
  acquireCompanies(): Observable<HttpResponse<any>> {
    const requestURL = environment.baseUrl + '/companies';
    return this.http.get<any>(requestURL, {
      observe: 'response'
    }).map((res:any)=> {
      return res.body;
    });
  }

  /* 获取部门 */
  acquireDepartment(param:any): Observable<HttpResponse<any>> {
    const requestURL = environment.baseUrl + '/organization/'+ param +'/suborg';
    return this.http.get<any>(requestURL, {
      observe: 'response'
    }).map((res:any)=> {
      return res.body;
    });
  }

  /* 获取人员 */
  acquireEmp(param:any): Observable<HttpResponse<any>> {
    const requestURL = environment.baseUrl + '/organization/'+ param +'/employee';
    return this.http.get<any>(requestURL, {
      observe: 'response'
    }).map((res:any)=> {
      return res.body;
    });
  }

}
