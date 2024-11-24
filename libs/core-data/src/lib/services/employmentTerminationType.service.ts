import { Injectable, Optional, Inject, InjectionToken} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { EmploymentTerminationTypes, Formation, Formations} from '@frontend/api-interface';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import * as servicesLib from './share';
import { API_BASE_URL } from '@frontend/core-data';

@Injectable({
  providedIn: 'root'
})
export class EmploymentTerminationTypeService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(servicesLib.API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : '';
  }

getAll(pageNumber: number, pageSize: number, filter:string= '', orderBy:string=""): Observable<EmploymentTerminationTypes> {
  let httpParams = new HttpParams();
  httpParams = httpParams.append('pageNumber', pageNumber.toString())
  httpParams = httpParams.append('pageSize', pageSize.toString())

  if(filter){
    httpParams = httpParams.append('filter', filter)
  }

  if(orderBy){
    httpParams = httpParams.append('orderBy',orderBy);
  }

  let url_ = this.baseUrl + '/api/employmentTerminationType';
  url_ = url_.replace(/[?&]$/, '');

  let options_: any = {
    observe: 'response',
    responseType: 'blob',
    params: httpParams,
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };

  return this.http
    .request('get', url_, options_)
    .pipe(
      _observableMergeMap((response_: any) => {
        return this.processgetAll(response_);
      })
    )
    .pipe(
      _observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processgetAll(<any>response_);
          } catch (e) {
            return <Observable<EmploymentTerminationTypes>>(<any>_observableCatch(e));
          }
        } else
          return <Observable<EmploymentTerminationTypes>>(<any>_observableCatch(response_));
      })
    );
}

protected processgetAll(response: HttpResponseBase): Observable<EmploymentTerminationTypes> {
  const status = response.status;

  const responseBlob =
    response instanceof HttpResponse
      ? response.body
      : (<any>response).error instanceof Blob
      ? (<any>response).error
      : undefined;

  let _headers: any = {};
  if (response.headers) {
    for (let key of response.headers.keys()) {
      _headers[key] = response.headers.get(key);
    }
  }
  if (status === 200) {
    return servicesLib.blobToText(responseBlob).pipe(
      _observableMergeMap((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ''
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = EmploymentTerminationTypes.fromJS(resultData200);
        return _observableOf(result200);
      })
    );
  } else if (status !== 200 && status !== 204) {
    return servicesLib.blobToText(responseBlob).pipe(
      _observableMergeMap((_responseText) => {
        return servicesLib.throwException(
          'An unexpected server error occurred.',
          status,
          _responseText,
          _headers
        );
      })
    );
  }
  return _observableOf<EmploymentTerminationTypes>(<any>null);
}
}


