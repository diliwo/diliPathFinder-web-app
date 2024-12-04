import { Injectable, Optional, Inject, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { BilanMv} from '@frontend/api-interface';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
  Subject,
} from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import * as servicesLib from './share';
import { API_BASE_URL } from '@frontend/core-data';

@Injectable({
  providedIn: 'root',
})
export class BilanService {
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

  getAll(
    pageNumber: number,
    pageSize: number,
    clientId: number,
    filter: string = '',
  ): Observable<BilanMv.BilanListVm> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('pageNumber', pageNumber.toString());
    httpParams = httpParams.append('pageSize', pageSize.toString());
    httpParams = httpParams.append('clientId', clientId.toString());

    if (filter) {
      httpParams = httpParams.append('filter', filter);
    }

    let url_ = this.baseUrl + '/api/bilans';
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
          return this.processGetAll(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAll(<any>response_);
            } catch (e) {
              return <Observable<BilanMv.BilanListVm>>(<any>_observableCatch(e));
            }
          } else
            return <Observable<BilanMv.BilanListVm>>(<any>_observableCatch(response_));
        })
      );
  }

  protected processGetAll(response: HttpResponseBase): Observable<BilanMv.BilanListVm> {
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
          result200 = BilanMv.BilanListVm.fromJS(resultData200);
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
    return _observableOf<BilanMv.BilanListVm>(<any>null);
  }

  insert(command: BilanMv.Bilan): Observable<void> {
    let url_ = this.baseUrl + '/api/bilans';
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
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processInsert(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processInsert(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processInsert(response: HttpResponseBase): Observable<void> {
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

  update(command: BilanMv.Bilan): Observable<void> {
    let url_ = this.baseUrl + '/api/bilans';
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
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUpdate(response: HttpResponseBase): Observable<void> {
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

  delete(id: number): Observable<void> {
    console.log(id);
    let url_ = this.baseUrl + '/api/bilans/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({}),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              console.log(response_);
              return this.processDelete(<any>response_);
            } catch (e) {
              console.log(e);
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processDelete(response: HttpResponseBase): Observable<void> {
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
    if (status === 204) {
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
  getAllArchived(
    pageNumber: number,
    pageSize: number,
    filter: string = ''
  ): Observable<BilanMv.BilanListVm> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('pageNumber', pageNumber.toString());
    httpParams = httpParams.append('pageSize', pageSize.toString());

    if (filter) {
      httpParams = httpParams.append('filter', filter);
    }

    let url_ = this.baseUrl + '/api/bilans/archived';
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
          return this.processgetAllArchived(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processgetAllArchived(<any>response_);
            } catch (e) {
              return <Observable<BilanMv.BilanListVm>>(<any>_observableCatch(e));
            }
          } else
            return <Observable<BilanMv.BilanListVm>>(<any>_observableCatch(response_));
        })
      );
  }

  protected processgetAllArchived(
    response: HttpResponseBase
  ): Observable<BilanMv.BilanListVm> {
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
          result200 = BilanMv.BilanListVm.fromJS(resultData200);
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
    return _observableOf<BilanMv.BilanListVm>(<any>null);
  }

  getCurrentBilan(bilanId: number): Observable<BilanMv.Bilan> {
    let url_ = this.baseUrl + '/api/bilans/{bilanId}/current';
    if (bilanId === undefined || bilanId === null)
      throw new Error("The parameter 'bilanId' must be defined.");
    url_ = url_.replace('{bilanId}', encodeURIComponent('' + bilanId));
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
          return this.processGetCurrentBilan(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetCurrentBilan(<any>response_);
            } catch (e) {
              return <Observable<BilanMv.Bilan>>(<any>_observableThrow(e));
            }
          } else return <Observable<BilanMv.Bilan>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetCurrentBilan(
    response: HttpResponseBase
  ): Observable<BilanMv.Bilan> {
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
          result200 = BilanMv.Bilan.fromJS(resultData200);
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
    return _observableOf<BilanMv.Bilan>(<any>null);
  }

  //

  finalize(id: number): Observable<void> {
    let url_ = this.baseUrl + '/api/bilans/{id}/finalize';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({}),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processFinalize(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processFinalize(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processFinalize(response: HttpResponseBase): Observable<void> {
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
    if (status === 204) {
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

  getLastBilan(bilanId: number): Observable<BilanMv.Bilan> {
    let url_ = this.baseUrl + '/api/bilans/{bilanId}/last';
    if (bilanId === undefined || bilanId === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{bilanId}', encodeURIComponent('' + bilanId));
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
          return this.processGetLastBilan(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetLastBilan(<any>response_);
            } catch (e) {
              return <Observable<BilanMv.Bilan>>(<any>_observableThrow(e));
            }
          } else return <Observable<BilanMv.Bilan>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetLastBilan(response: HttpResponseBase): Observable<BilanMv.Bilan> {
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
          result200 = BilanMv.Bilan.fromJS(resultData200);
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
    return _observableOf<BilanMv.Bilan>(<any>null);
  }

  GetDocument(bilanId: number): Observable<any> {
     let url_ = this.baseUrl + "/api/bilans/{bilanId}/document";
    if (bilanId === undefined || bilanId === null)
        throw new Error("The parameters 'id' must be defined.");

    url_ = url_.replace("{bilanId}", encodeURIComponent("" + bilanId));
    url_ = url_.replace(/[?&]$/, "");

    let options_ : any = {
        observe: "response",
        responseType: "arraybuffer",
        headers: new HttpHeaders({
            "Accept": "application/json"
        })
    };
    return this.http.get(url_, {responseType: 'arraybuffer'});
  }
}
