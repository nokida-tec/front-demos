import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from './app.constants';
import { createRequestOption } from './shared';
import { IOrganization } from './organization.model';

type EntityResponseType = HttpResponse<IOrganization>;
type EntityArrayResponseType = HttpResponse<IOrganization[]>;

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  public resourceUrl = SERVER_API_URL + 'api/sexes';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/sexes';

  constructor(protected http: HttpClient) {}

  create(sex: IOrganization): Observable<EntityResponseType> {
    return this.http.post<IOrganization>(this.resourceUrl, sex, { observe: 'response' });
  }

  update(sex: IOrganization): Observable<EntityResponseType> {
    return this.http.put<IOrganization>(this.resourceUrl, sex, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrganization>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrganization[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrganization[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
