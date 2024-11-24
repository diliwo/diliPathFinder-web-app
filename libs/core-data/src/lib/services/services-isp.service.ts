/* eslint-disable prefer-const */
import { Injectable, Optional, Inject, InjectionToken} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { ServiceDetail, ServiceListVm,UpsertServiceDetailCommand} from '@frontend/api-interface';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import * as servicesLib from './share';
//import { API_BASE_URL } from '@frontend/core-data';

//export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export interface IBeneficiariesService {
  allServices() : Observable<ServiceListVm>;
}

@Injectable({
  providedIn: 'root'
})

export class ServicesIspService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(servicesLib.API_BASE_URL) baseUrl?: string) {
      this.http = http;
      this.baseUrl = baseUrl ? baseUrl : "";
    }


    allServices(
      pageNumber: number,
      pageSize: number,
      filter: string = '',
      orderBy:string=""
    ): Observable<ServiceListVm> {
      let httpParams = new HttpParams();
      httpParams = httpParams.append('pageNumber', pageNumber.toString());
      httpParams = httpParams.append('pageSize', pageSize.toString());

      if (filter) {
        httpParams = httpParams.append('filter', filter);
      }

      if(orderBy){
        httpParams = httpParams.append('orderBy',orderBy);
      }

      let url_ = this.baseUrl + "/api/services";
      url_ = url_.replace(/[?&]$/, "");
        console.log(url_);
      let options_ : any = {
          observe: "response",
          responseType: "blob",
          params: httpParams,
          headers: new HttpHeaders({
              "Accept": "application/json"
          })
      };

      return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processIsServiceUniqueAll(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processIsServiceUniqueAll(<any>response_);
              } catch (e) {
                  return <Observable<ServiceListVm>><any>_observableThrow(e);
              }
          } else
              return <Observable<ServiceListVm>><any>_observableThrow(response_);
      }));
    }

    protected processIsServiceUniqueAll(response: HttpResponseBase): Observable<ServiceListVm> {
      const status = response.status;

      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ServiceListVm.fromJS(resultData200);
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<ServiceListVm>(<any>null);
    }

    upsert(command: UpsertServiceDetailCommand): Observable<void> {
      let url_ = this.baseUrl + "/api/services";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(command);

      let options_ : any = {
          body: content_,
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Content-Type": "application/json",
          })
      };

      return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processUpsert(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processUpsert(<any>response_);
              } catch (e) {
                  return <Observable<void>><any>_observableThrow(e);
              }
          } else
              return <Observable<void>><any>_observableThrow(response_);
      }));
  }

  protected processUpsert(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
        }));
    } else {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let resultdefault: any = null;
        let resultDatadefault = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
        return servicesLib.throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
        }));
    }
  }



  delete(id: number): Observable<void> {
      console.log(id);
    let url_ = this.baseUrl + "/api/services/{id}";
    if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_ : any = {
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
        })
    };

    return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        return this.processDelete(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
              console.log(response_);
                return this.processDelete(<any>response_);
            } catch (e) {
              console.log(e);
                return <Observable<void>><any>_observableThrow(e);
            }
        } else
            return <Observable<void>><any>_observableThrow(response_);
    }));
}

  protected processDelete(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 204) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
        }));
    } else {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let resultdefault: any = null;
        let resultDatadefault = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
        return servicesLib.throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
        }));
    }
}

  isServiceUnique(name: string): Observable<boolean> {
    let url_ = this.baseUrl + '/api/services/{name}';
    if (name === undefined || name === null)
      throw new Error("The parameter 'name' must be defined.");
    url_ = url_.replace('{name}', encodeURIComponent('' + name));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processIsServiceUnique(response_);
        })
      ).pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processIsServiceUnique(<any>response_);
            } catch (e) {
              return <Observable<boolean>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<boolean>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processIsServiceUnique(
    response: HttpResponseBase
  ): Observable<boolean> {
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
          result200 = resultData200
          return _observableOf(result200);
        })
      );
    } else if (status === 404) {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = servicesLib.ProblemDetails.fromJS(resultData404);
          return servicesLib.throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result404
          );
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
    return _observableOf<boolean>(<any>null);
  }
}
