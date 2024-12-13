import { Injectable, Optional, Inject, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { PartnersListVm, Partner, PartnerSelections } from '@frontend/api-interface';
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

export interface IPartnersService {
  allPartners(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<PartnersListVm>;
}

@Injectable({
  providedIn: 'root',
})
export class PartnersService implements IPartnersService {
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

  allPartners(
    pageNumber: number,
    pageSize: number,
    filter: string = '',
    orderBy:string=""
  ): Observable<PartnersListVm> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('pageNumber', pageNumber.toString());
    httpParams = httpParams.append('pageSize', pageSize.toString());

    if (filter) {
      httpParams = httpParams.append('filter', filter);
    }

    if(orderBy){
      httpParams = httpParams.append('orderBy',orderBy);
    }

    let url_ = this.baseUrl + '/partners';
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
              return <Observable<PartnersListVm>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<PartnersListVm>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGetAll(
    response: HttpResponseBase
  ): Observable<PartnersListVm> {
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
          result200 = PartnersListVm.fromJS(resultData200);
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
    return _observableOf<PartnersListVm>(<any>null);
  }

  delete(id: number): Observable<void> {
    let url_ = this.baseUrl + '/partners/{id}';
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
              return this.processDelete(<any>response_);
            } catch (e) {
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
    console.log(status);
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
          console.log(_responseText);
          console.log(this.jsonParseReviver);
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

  create(command: Partner): Observable<void> {
    let url_ = this.baseUrl + '/partners';
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
          return this.processCreate(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCreate(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processCreate(response: HttpResponseBase): Observable<void> {
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

  update(command: Partner): Observable<void> {
    let url_ = this.baseUrl + '/partners';
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

  GetPartnersSelection(
    pageNumber: number,
    pageSize: number,
    filter: string = '',
    orderBy:string=""
  ): Observable<PartnerSelections> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('pageNumber', pageNumber.toString());
    httpParams = httpParams.append('pageSize', pageSize.toString());

    if (filter) {
      httpParams = httpParams.append('filter', filter);
    }

    if(orderBy){
      httpParams = httpParams.append('orderBy',orderBy);
    }

    let url_ = this.baseUrl + '/partners/selectionlist';
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
          return this.processSelection(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSelection(<any>response_);
            } catch (e) {
              return <Observable<PartnerSelections>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<PartnerSelections>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSelection(
    response: HttpResponseBase
  ): Observable<PartnerSelections> {
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
          result200 = PartnerSelections.fromJS(resultData200);
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
    return _observableOf<PartnerSelections>(<any>null);
  }
}
