import { Injectable, Optional, Inject, InjectionToken} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { SupportDetail, SupportListVm,Support, MySupportsList, MyJobCoachSupport, MyJobCoachSupportsList, ReasonOfClosures } from '@frontend/api-interface';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import * as servicesLib from './share';

//export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class SupportsService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(servicesLib.API_BASE_URL) baseUrl?: string) {
      this.http = http;
      this.baseUrl = baseUrl ? baseUrl : "";
    }

    getAll(pageNumber: number, pageSize: number, clientId:number): Observable<SupportListVm> {
      let httpParams = new HttpParams();
      httpParams = httpParams.append('pageNumber', pageNumber.toString())
      httpParams = httpParams.append('pageSize', pageSize.toString())
      httpParams = httpParams.append('clientId', clientId.toString())

      let url_ = this.baseUrl + "/api/supports";
      url_ = url_.replace(/[?&]$/, '');

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          params: httpParams,
          headers: new HttpHeaders({
              "Accept": "application/json"
          })
      };

      return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processGetAllByclient(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processGetAllByclient(<any>response_);
              } catch (e) {
                  return <Observable<SupportListVm>><any>_observableThrow(e);
              }
          } else
              return <Observable<SupportListVm>><any>_observableThrow(response_);
      }));
  }

    protected processGetAllByclient(response: HttpResponseBase): Observable<SupportListVm> {
      const status = response.status;

      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = SupportListVm.fromJS(resultData200);
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<SupportListVm>(<any>null);
    }


    upsert(command: Support): Observable<void> {
        let url_ = this.baseUrl + "/api/supports";
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
    let url_ = this.baseUrl + "/api/supports/{id}";
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
        let resultDatadefault = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
        return servicesLib.throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
        }));
    }
  }

  allSupports(): Observable<SupportListVm> {
    let url_ = this.baseUrl + "/api/supports";
    url_ = url_.replace(/[?&]$/, "");

    let options_ : any = {
        observe: "response",
        responseType: "blob",
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
                return <Observable<SupportListVm>><any>_observableThrow(e);
            }
        } else
            return <Observable<SupportListVm>><any>_observableThrow(response_);
    }));
  }

  protected processGetAll(response: HttpResponseBase): Observable<SupportListVm> {
    const status = response.status;

    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = SupportListVm.fromJS(resultData200);
        console.log(result200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<SupportListVm>(<any>null);
  }

  close(command: Support): Observable<void> {
    let url_ = this.baseUrl + "/api/supports/close";
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

    return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        return this.processClose(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processClose(<any>response_);
            } catch (e) {
                return <Observable<void>><any>_observableThrow(e);
            }
        } else
            return <Observable<void>><any>_observableThrow(response_);
    }));
}

protected processClose(response: HttpResponseBase): Observable<void> {
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
//
getMySupports(pageNumber: number, pageSize: number, filter:string= '',isActive = true, orderBy:string=""): Observable<MySupportsList> {
  let httpParams = new HttpParams();
  httpParams = httpParams.append('pageNumber', pageNumber.toString())
  httpParams = httpParams.append('pageSize', pageSize.toString())

  if(filter){
    httpParams = httpParams.append('filter', filter)
  }

  if(isActive){
    httpParams = httpParams.append('isActive',isActive.toString());
  }

  if(orderBy){
    httpParams = httpParams.append('orderBy',orderBy);
  }

  let url_ = this.baseUrl + "/api/supports/mysupports";
  url_ = url_.replace(/[?&]$/, '');

  let options_ : any = {
      observe: "response",
      responseType: "blob",
      params: httpParams,
      headers: new HttpHeaders({
          "Accept": "application/json"
      })
  };

  return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
      return this.processGetMySupports(response_);
  })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
          try {
              return this.processGetMySupports(<any>response_);
          } catch (e) {
              return <Observable<MySupportsList>><any>_observableThrow(e);
          }
      } else
          return <Observable<MySupportsList>><any>_observableThrow(response_);
  }));
}

protected processGetMySupports(response: HttpResponseBase): Observable<MySupportsList> {
  const status = response.status;

  const responseBlob =
      response instanceof HttpResponse ? response.body :
      (<any>response).error instanceof Blob ? (<any>response).error : undefined;

  let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
  if (status === 200) {
      return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
      let result200: any = null;
      let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
      result200 = MySupportsList.fromJS(resultData200);
      return _observableOf(result200);
      }));
  } else if (status !== 200 && status !== 204) {
      return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
      return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
  }
  return _observableOf<MySupportsList>(<any>null);
}

//--------------------------------------------------
getMyJoabCoachSupports(pageNumber: number, pageSize: number, filter:string= '', isActive = true, orderBy:string=""): Observable<MyJobCoachSupportsList> {
  let httpParams = new HttpParams();
  httpParams = httpParams.append('pageNumber', pageNumber.toString())
  httpParams = httpParams.append('pageSize', pageSize.toString())

  if(filter){
    httpParams = httpParams.append('filter', filter)
  }

  if(isActive){
    httpParams = httpParams.append('isActive',isActive.toString());
  }

  if(orderBy){
    httpParams = httpParams.append('orderBy',orderBy);
  }

  let url_ = this.baseUrl + "/api/supports/mycoachsupports";
  url_ = url_.replace(/[?&]$/, '');

  let options_ : any = {
      observe: "response",
      responseType: "blob",
      params: httpParams,
      headers: new HttpHeaders({
          "Accept": "application/json"
      })
  };

  return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
      return this.processGetMyJoabCoachSupports(response_);
  })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
          try {
              return this.processGetMyJoabCoachSupports(<any>response_);
          } catch (e) {
              return <Observable<MyJobCoachSupportsList>><any>_observableThrow(e);
          }
      } else
          return <Observable<MyJobCoachSupportsList>><any>_observableThrow(response_);
  }));
}

protected processGetMyJoabCoachSupports(response: HttpResponseBase): Observable<MyJobCoachSupportsList> {
  const status = response.status;

  const responseBlob =
      response instanceof HttpResponse ? response.body :
      (<any>response).error instanceof Blob ? (<any>response).error : undefined;

  let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
  if (status === 200) {
      return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
      let result200: any = null;
      let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
      result200 = MyJobCoachSupportsList.fromJS(resultData200);
      return _observableOf(result200);
      }));
  } else if (status !== 200 && status !== 204) {
      return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
      return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
  }
  return _observableOf<MyJobCoachSupportsList>(<any>null);
}

getReasons(): Observable<ReasonOfClosures> {
  let url_ = this.baseUrl + '/api/supports/reasons';
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
        return this.processReasons(response_);
      })
    )
    .pipe(
      _observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processReasons(<any>response_);
          } catch (e) {
            return <Observable<ReasonOfClosures>>(
              (<any>_observableThrow(e))
            );
          }
        } else
          return <Observable<ReasonOfClosures>>(
            (<any>_observableThrow(response_))
          );
      })
    );
}

protected processReasons(
  response: HttpResponseBase
): Observable<ReasonOfClosures> {
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
        result200 = ReasonOfClosures.fromJS(resultData200);
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
  return _observableOf<ReasonOfClosures>(<any>null);
}
}
