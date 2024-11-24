import { Injectable, Optional, Inject, InjectionToken} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { CandidaciesListVm, Candidacy, EmploymentStatusItem, IntegrationWorker, IntegrationWorkers } from '@frontend/api-interface';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import * as servicesLib from './share';

@Injectable({
  providedIn: 'root'
})
export class CandidaciesService {

  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(servicesLib.API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  getAll(pageNumber: number, pageSize: number, beneficiaryId:number): Observable<CandidaciesListVm> {
    let httpParams = new HttpParams();
      httpParams = httpParams.append('pageNumber', pageNumber.toString())
      httpParams = httpParams.append('pageSize', pageSize.toString())
      httpParams = httpParams.append('beneficiaryId', beneficiaryId.toString())

    let url_ = this.baseUrl + "/api/candidacies";
    url_ = url_.replace(/[?&]$/, "");

    let options_ : any = {
        observe: "response",
        responseType: "blob",
        params: httpParams,
        headers: new HttpHeaders({
            "Accept": "application/json"
        })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
      return this.processGetAll(response_);
  })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
          try {
              return this.processGetAll(<any>response_);
          } catch (e) {
              return <Observable<CandidaciesListVm>><any>_observableThrow(e);
          }
      } else
          return <Observable<CandidaciesListVm>><any>_observableThrow(response_);
  }));
  }

  protected processGetAll(response: HttpResponseBase): Observable<CandidaciesListVm> {
    const status = response.status;

    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CandidaciesListVm.fromJS(resultData200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<CandidaciesListVm>(<any>null);
  }

  upsert(command: Candidacy): Observable<void> {
    let url_ = this.baseUrl + "/api/candidacies";
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
    let url_ = this.baseUrl + "/api/candidacies/{id}";
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
                return this.processDelete(<any>response_);
            } catch (e) {
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
        console.log(_responseText);
        console.log(this.jsonParseReviver);
        let resultDatadefault = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
        return servicesLib.throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
        }));
    }
  }

  getIntegrationsWorkers(
    pageNumber: number,
    pageSize: number,
    filter:string= '',
    isInProgress: boolean = false,
    orderBy:string="jobtitle asc"): Observable<IntegrationWorkers> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('pageNumber', pageNumber.toString())
    httpParams = httpParams.append('pageSize', pageSize.toString())

    if(isInProgress){
      httpParams = httpParams.append('isInProgress', isInProgress.toString())
    }

    if(filter){
      httpParams = httpParams.append('filter', filter)
    }

    if(orderBy){
      httpParams = httpParams.append('orderBy',orderBy);
    }

    let url_ = this.baseUrl + '/api/candidacies/integration-job';
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
          return this.processGetIntegrationWorkers(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetIntegrationWorkers(<any>response_);
            } catch (e) {
              return <Observable<IntegrationWorkers>>(<any>_observableCatch(e));
            }
          } else
            return <Observable<IntegrationWorkers>>(<any>_observableCatch(response_));
        })
      );
  }

  protected processGetIntegrationWorkers(response: HttpResponseBase): Observable<IntegrationWorkers> {
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
          result200 = IntegrationWorkers.fromJS(resultData200);
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
    return _observableOf<IntegrationWorkers>(<any>null);
  }

  addToHistory(command: any): Observable<void> {
    let url_ = this.baseUrl + "/api/candidacies/history";
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
        return this.processaddToHistory(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processaddToHistory(<any>response_);
            } catch (e) {
                return <Observable<void>><any>_observableThrow(e);
            }
        } else
            return <Observable<void>><any>_observableThrow(response_);
    }));
}

protected processaddToHistory(response: HttpResponseBase): Observable<void> {
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




////
terminateEmployment(command: any): Observable<CandidaciesListVm> {
  let url_ = this.baseUrl + "/api/candidacies/terminate";
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
      return this.processTerminateEmployment(response_);
  })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
          try {
              return this.processTerminateEmployment(<any>response_);
          } catch (e) {
            return <Observable<CandidaciesListVm>><any>_observableThrow(e);
          }
      } else
      return <Observable<CandidaciesListVm>><any>_observableThrow(response_);
  }));
}

  protected processTerminateEmployment(response: HttpResponseBase): Observable<CandidaciesListVm> {
    const status = response.status;

    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CandidaciesListVm.fromJS(resultData200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204 && status !== 201) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<CandidaciesListVm>(<any>null);
  }
}
