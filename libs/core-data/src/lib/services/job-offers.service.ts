import { Injectable, Optional, Inject, InjectionToken} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { JobOffersListVm, JobDetail, JobOfferDetail } from '@frontend/api-interface';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import * as servicesLib from './share';

@Injectable({
  providedIn: 'root'
})
export class JobOffersService {

  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(servicesLib.API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  allJobOffers(): Observable<JobOffersListVm> {
    let url_ = this.baseUrl + "/api/jobOffers";
    url_ = url_.replace(/[?&]$/, "");
    console.log(url_);
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
              return <Observable<JobOffersListVm>><any>_observableThrow(e);
          }
      } else
          return <Observable<JobOffersListVm>><any>_observableThrow(response_);
  }));
  }

  protected processGetAll(response: HttpResponseBase): Observable<JobOffersListVm> {
    const status = response.status;

    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = JobOffersListVm.fromJS(resultData200);
        console.log(result200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<JobOffersListVm>(<any>null);
  }

  upsert(command: JobOfferDetail): Observable<void> {
    let url_ = this.baseUrl + "/api/joboffers";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(command);
    console.log(content_);
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

getJobOffersBySearch(text : string): Observable<JobOffersListVm> {
  let url_ = this.baseUrl + '/api/jobOffers/searchtext/{text}';
  url_ = url_.replace('{text}', encodeURIComponent('' + text));
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
        return this.processGeJobOffersBySearch(response_);
      })
    )
    .pipe(
      _observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
          try {
            return this.processGeJobOffersBySearch(<any>response_);
          } catch (e) {
            return <Observable<JobOffersListVm>>(
              (<any>_observableThrow(e))
            );
          }
        } else
          return <Observable<JobOffersListVm>>(
            (<any>_observableThrow(response_))
          );
      })
    );
}

protected processGeJobOffersBySearch(
  response: HttpResponseBase
): Observable<JobOffersListVm> {
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
        result200 = JobOffersListVm.fromJS(resultData200);
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
  return _observableOf<JobOffersListVm>(<any>null);
}

}
