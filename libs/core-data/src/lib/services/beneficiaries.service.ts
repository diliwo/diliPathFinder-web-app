/* eslint-disable prefer-const */
import { Injectable, Optional, Inject, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import {
  BeneficiaryDetail,
  BeneficiaryLookUp,
  BeneficiariesLookUp,
} from '@frontend/api-interface';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import * as servicesLib from './share';
//import { API_BASE_URL } from '@frontend/core-data';

//export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export interface IBeneficiariesService {
  allBeneficiariesLookUp(): Observable<BeneficiariesLookUp>;
}

@Injectable({
  providedIn: 'root',
})
export class BeneficiariesService implements IBeneficiariesService {
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

  allBeneficiariesLookUp(): Observable<BeneficiariesLookUp> {
    let url_ = this.baseUrl + '/api/beneficiaries';
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
          return this.processGetAll(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAll(<any>response_);
            } catch (e) {
              return <Observable<BeneficiariesLookUp>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<BeneficiariesLookUp>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGetAll(
    response: HttpResponseBase
  ): Observable<BeneficiariesLookUp> {
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
          result200 = BeneficiariesLookUp.fromJS(resultData200);
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
    return _observableOf<BeneficiariesLookUp>(<any>null);
  }

  getBeneficiaryByNiss(niss: string): Observable<BeneficiaryDetail> {
    let url_ = this.baseUrl + '/api/beneficiaries/{niss}';
    if (niss === undefined || niss === null)
      throw new Error("The parameter 'niss' must be defined.");
    url_ = url_.replace('{niss}', encodeURIComponent('' + niss));
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
          return this.processGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGet(<any>response_);
            } catch (e) {
              return <Observable<BeneficiaryDetail>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<BeneficiaryDetail>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGet(
    response: HttpResponseBase
  ): Observable<BeneficiaryDetail> {
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
          result200 = BeneficiaryDetail.fromJS(resultData200);
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
    return _observableOf<BeneficiaryDetail>(<any>null);
  }

  import(niss: string): Observable<number> {
    let url_ = this.baseUrl + '/api/beneficiaries/{niss}/import';
    url_ = url_.replace('{niss}', encodeURIComponent('' + niss));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(niss);
    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processImport(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processImport(<any>response_);
            } catch (e) {
              return <Observable<number>>(<any>_observableThrow(e));
            }
          } else return <Observable<number>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processImport(response: HttpResponseBase): Observable<number> {
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
              : parseInt(_responseText);
          return _observableOf<number>(resultData200);
        })
      );
    } else {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
          return servicesLib.throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  updateLanguage(niss: string, language: string): Observable<void> {
    console.log(niss,language);
    let url_ = this.baseUrl + '/api/beneficiaries/updatelanguage/{niss}/{language}';
    url_ = url_.replace('{niss}', encodeURIComponent('' + niss));
    url_ = url_.replace('{language}', encodeURIComponent('' + language));
    url_ = url_.replace(/[?&]$/, '');
    console.log(url_);

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateLanguage(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateLanguage(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUpdateLanguage(response: HttpResponseBase): Observable<void> {
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
          return _observableOf<void>(<any>null);
        })
      );
    } else {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
          return servicesLib.throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }


  getBeneficiaryBySearch(text : string): Observable<BeneficiariesLookUp> {
    let url_ = this.baseUrl + '/api/beneficiaries/searchtext/{text}';
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
          return this.processGetBeneficiaryBySearch(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetBeneficiaryBySearch(<any>response_);
            } catch (e) {
              return <Observable<BeneficiariesLookUp>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<BeneficiariesLookUp>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGetBeneficiaryBySearch(
    response: HttpResponseBase
  ): Observable<BeneficiariesLookUp> {
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
          result200 = BeneficiariesLookUp.fromJS(resultData200);
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
    return _observableOf<BeneficiariesLookUp>(<any>null);
  }

  getAll(pageNumber: number, pageSize: number, filter:string= ''): Observable<BeneficiariesLookUp> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('pageNumber', pageNumber.toString())
    httpParams = httpParams.append('pageSize', pageSize.toString())

    if(filter){
      httpParams = httpParams.append('filter', filter)
    }

    let url_ = this.baseUrl + '/api/beneficiaries/integration-job';
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
          return this.processGetBeneficiairiesInIntegrationJobs(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetBeneficiairiesInIntegrationJobs(<any>response_);
            } catch (e) {
              return <Observable<BeneficiariesLookUp>>(<any>_observableCatch(e));
            }
          } else
            return <Observable<BeneficiariesLookUp>>(<any>_observableCatch(response_));
        })
      );
  }

  protected processGetBeneficiairiesInIntegrationJobs(response: HttpResponseBase): Observable<BeneficiariesLookUp> {
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
          result200 = BeneficiariesLookUp.fromJS(resultData200);
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
    return _observableOf<BeneficiariesLookUp>(<any>null);
  }

  refreshBeneficiaries(data: string[]): Observable<void> {
    let url_ = this.baseUrl + "/api/beneficiaries/refresh";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(data);

    let options_ : any = {
        body: content_,
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        return this.processrefreshMyBeneficiaries(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processrefreshMyBeneficiaries(<any>response_);
            } catch (e) {
                return <Observable<void>><any>_observableThrow(e);
            }
        } else
            return <Observable<void>><any>_observableThrow(response_);
    }));
  }

  protected processrefreshMyBeneficiaries(response: HttpResponseBase): Observable<void> {
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

  updateIbisNumber(command: any, niss:string): Observable<void> {
    let url_ = this.baseUrl + '/api/beneficiaries/upsertibis/{niss}';
    url_ = url_.replace('{niss}', encodeURIComponent('' + niss));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('patch', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateIbisNumber(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateIbisNumber(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUpdateIbisNumber(response: HttpResponseBase): Observable<void> {
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
          return _observableOf<void>(<any>null);
        })
      );
    } else {
      return servicesLib.blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = servicesLib.ProblemDetails.fromJS(resultDatadefault);
          return servicesLib.throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
