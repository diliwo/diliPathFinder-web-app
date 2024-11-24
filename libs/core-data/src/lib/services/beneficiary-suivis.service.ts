import { Injectable, Optional, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import { API_BASE_URL } from '@frontend/core-data';
import {
  CreateMonitoringActionCommand,
  CreateQuarterlyMonitoringCommand,
  MonitoringActionDto,
  PaginatedListOfQuarterlyMonitoringDto,
  QuarterlyMonitoringDto,
  UpdateMonitoringActionCommand,
  UpdateQuarterlyMonitoringCommand,
} from 'libs/api-interface/src/lib/api-interface.module';
import { blobToText, ProblemDetails, throwException } from './share';
import * as servicesLib from './share';

@Injectable({
  providedIn: 'root',
})
export class BeneficiarySuivisService  {
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
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  getAll(
    filter: string | null | undefined,
    withDeleted: boolean | undefined,
    pageNumber: number | undefined,
    pageSize: number | undefined
  ): Observable<PaginatedListOfQuarterlyMonitoringDto> {
    let url_ = this.baseUrl + '/api/QuarterlyMonitoring?';
    if (filter !== undefined && filter !== null)
      url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
    if (withDeleted === null)
      throw new Error("The parameter 'withDeleted' cannot be null.");
    else if (withDeleted !== undefined)
      url_ += 'WithDeleted=' + encodeURIComponent('' + withDeleted) + '&';
    if (pageNumber === null)
      throw new Error("The parameter 'pageNumber' cannot be null.");
    else if (pageNumber !== undefined)
      url_ += 'PageNumber=' + encodeURIComponent('' + pageNumber) + '&';
    if (pageSize === null)
      throw new Error("The parameter 'pageSize' cannot be null.");
    else if (pageSize !== undefined)
      url_ += 'PageSize=' + encodeURIComponent('' + pageSize) + '&';
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
              return <Observable<PaginatedListOfQuarterlyMonitoringDto>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<PaginatedListOfQuarterlyMonitoringDto>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGetAll(
    response: HttpResponseBase
  ): Observable<PaginatedListOfQuarterlyMonitoringDto> {
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = PaginatedListOfQuarterlyMonitoringDto.fromJS(
            resultData200
          );
          return _observableOf(result200);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<PaginatedListOfQuarterlyMonitoringDto>(<any>null);
  }

  create(command: CreateQuarterlyMonitoringCommand): Observable<number> {
    let url_ = this.baseUrl + '/api/QuarterlyMonitoring';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
              return <Observable<number>>(<any>_observableThrow(e));
            }
          } else return <Observable<number>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processCreate(response: HttpResponseBase): Observable<number> {
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<number>(<any>null);
  }

  update(command: UpdateQuarterlyMonitoringCommand): Observable<number> {
    let url_ = this.baseUrl + '/api/QuarterlyMonitoring';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
              return <Observable<number>>(<any>_observableThrow(e));
            }
          } else return <Observable<number>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUpdate(response: HttpResponseBase): Observable<number> {
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<number>(<any>null);
  }

  getAllByBeneficiaryId(
    beneficiaryId: number | undefined,
    filter: string | null | undefined,
    withDeleted: boolean | undefined,
    pageNumber: number | undefined,
    pageSize: number | undefined
  ): Observable<PaginatedListOfQuarterlyMonitoringDto> {
    let url_ = this.baseUrl + '/api/QuarterlyMonitoring/beneficiary?';
    if (beneficiaryId === null)
      throw new Error("The parameter 'beneficiaryId' cannot be null.");
    else if (beneficiaryId !== undefined)
      url_ += 'BeneficiaryId=' + encodeURIComponent('' + beneficiaryId) + '&';
    if (filter !== undefined && filter !== null)
      url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
    if (withDeleted === null)
      throw new Error("The parameter 'withDeleted' cannot be null.");
    else if (withDeleted !== undefined)
      url_ += 'WithDeleted=' + encodeURIComponent('' + withDeleted) + '&';
    if (pageNumber === null)
      throw new Error("The parameter 'pageNumber' cannot be null.");
    else if (pageNumber !== undefined)
      url_ += 'PageNumber=' + encodeURIComponent('' + pageNumber) + '&';
    if (pageSize === null)
      throw new Error("The parameter 'pageSize' cannot be null.");
    else if (pageSize !== undefined)
      url_ += 'PageSize=' + encodeURIComponent('' + pageSize) + '&';
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
          return this.processGetAllByBeneficiaryId(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAllByBeneficiaryId(<any>response_);
            } catch (e) {
              return <Observable<PaginatedListOfQuarterlyMonitoringDto>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<PaginatedListOfQuarterlyMonitoringDto>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGetAllByBeneficiaryId(
    response: HttpResponseBase
  ): Observable<PaginatedListOfQuarterlyMonitoringDto> {
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = PaginatedListOfQuarterlyMonitoringDto.fromJS(
            resultData200
          );
          return _observableOf(result200);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<PaginatedListOfQuarterlyMonitoringDto>(<any>null);
  }

  getAllByReferentId(
    referentId: number | undefined,
    filter: string | null | undefined,
    withDeleted: boolean | undefined,
    pageNumber: number | undefined,
    pageSize: number | undefined
  ): Observable<PaginatedListOfQuarterlyMonitoringDto> {
    let url_ = this.baseUrl + '/api/QuarterlyMonitoring/referent?';
    if (referentId === null)
      throw new Error("The parameter 'referentId' cannot be null.");
    else if (referentId !== undefined)
      url_ += 'ReferentId=' + encodeURIComponent('' + referentId) + '&';
    if (filter !== undefined && filter !== null)
      url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
    if (withDeleted === null)
      throw new Error("The parameter 'withDeleted' cannot be null.");
    else if (withDeleted !== undefined)
      url_ += 'WithDeleted=' + encodeURIComponent('' + withDeleted) + '&';
    if (pageNumber === null)
      throw new Error("The parameter 'pageNumber' cannot be null.");
    else if (pageNumber !== undefined)
      url_ += 'PageNumber=' + encodeURIComponent('' + pageNumber) + '&';
    if (pageSize === null)
      throw new Error("The parameter 'pageSize' cannot be null.");
    else if (pageSize !== undefined)
      url_ += 'PageSize=' + encodeURIComponent('' + pageSize) + '&';
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
          return this.processGetAllByReferentId(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAllByReferentId(<any>response_);
            } catch (e) {
              return <Observable<PaginatedListOfQuarterlyMonitoringDto>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<PaginatedListOfQuarterlyMonitoringDto>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGetAllByReferentId(
    response: HttpResponseBase
  ): Observable<PaginatedListOfQuarterlyMonitoringDto> {
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = PaginatedListOfQuarterlyMonitoringDto.fromJS(
            resultData200
          );
          return _observableOf(result200);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<PaginatedListOfQuarterlyMonitoringDto>(<any>null);
  }

  get(id: number): Observable<QuarterlyMonitoringDto> {
    let url_ = this.baseUrl + '/api/QuarterlyMonitoring/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
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
              return <Observable<QuarterlyMonitoringDto>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<QuarterlyMonitoringDto>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGet(
    response: HttpResponseBase
  ): Observable<QuarterlyMonitoringDto> {
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = QuarterlyMonitoringDto.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<QuarterlyMonitoringDto>(<any>null);
  }

  delete(id: number): Observable<void> {
    let url_ = this.baseUrl + '/api/QuarterlyMonitoring/{id}';
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
    if (status === 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return _observableOf<void>(<any>null);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<void>(<any>null);
  }
}

@Injectable({
  providedIn: 'root',
})
export class MonitoringActionsService {
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
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  getAll(): Observable<MonitoringActionDto[]> {
    let url_ = this.baseUrl + '/api/MonitoringAction';
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
              return <Observable<MonitoringActionDto[]>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<MonitoringActionDto[]>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGetAll(
    response: HttpResponseBase
  ): Observable<MonitoringActionDto[]> {
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          if (Array.isArray(resultData200)) {
            result200 = [] as any;
            for (let item of resultData200)
              result200!.push(MonitoringActionDto.fromJS(item));
          }
          return _observableOf(result200);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<MonitoringActionDto[]>(<any[]>null);
  }

  create(command: CreateMonitoringActionCommand): Observable<void> {
    let url_ = this.baseUrl + '/api/MonitoringAction';
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return _observableOf<void>(<any>null);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<void>(<any>null);
  }

  update(command: UpdateMonitoringActionCommand): Observable<void> {
    let url_ = this.baseUrl + '/api/MonitoringAction';
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return _observableOf<void>(<any>null);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<void>(<any>null);
  }

  get(id: number): Observable<MonitoringActionDto> {
    let url_ = this.baseUrl + '/api/MonitoringAction/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
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
              return <Observable<MonitoringActionDto>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<MonitoringActionDto>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processGet(
    response: HttpResponseBase
  ): Observable<MonitoringActionDto> {
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
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = MonitoringActionDto.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<MonitoringActionDto>(<any>null);
  }

  delete(id: number): Observable<void> {
    let url_ = this.baseUrl + '/api/MonitoringAction/{id}';
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
    if (status === 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return _observableOf<void>(<any>null);
        })
      );
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result400: any = null;
          let resultData400 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result400 = ProblemDetails.fromJS(resultData400);
          return throwException(
            'A server side error occurred.',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<void>(<any>null);
  }
}
