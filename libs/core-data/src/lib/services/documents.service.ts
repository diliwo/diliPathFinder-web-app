import { Injectable, Optional, Inject, InjectionToken} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { JobsListVm, JobDetail, DocumentDetail,DocumentListVm } from '@frontend/api-interface';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import * as servicesLib from './share';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
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

  save(command: DocumentDetail): Observable<void> {
    let url_ = this.baseUrl + '/api/documents/partner/import';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);
    console.log(content_);
    const options_: any = {
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
          return this.processSave(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSave(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSave(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    const _headers: any = {};
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
          const resultDatadefault =
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

  GetDocumentsByJobIAndPartnerId(partnerId: number, jobId:number): Observable<DocumentListVm> {
    let url_ = this.baseUrl + "/api/documents/{partnerId}/{jobId}";
    if ((partnerId === undefined || partnerId === null) || (jobId === undefined || jobId === null))
        throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{partnerId}", encodeURIComponent("" + partnerId));
    url_ = url_.replace("{jobId}", encodeURIComponent("" + jobId));
    url_ = url_.replace(/[?&]$/, "");

    let options_ : any = {
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
            "Accept": "application/json"
        })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        return this.processGetDocumentsByJobIAndPartnerId(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processGetDocumentsByJobIAndPartnerId(<any>response_);
            } catch (e) {
                return <Observable<DocumentListVm>><any>_observableThrow(e);
            }
        } else
            return <Observable<DocumentListVm>><any>_observableThrow(response_);
    }));
  }

  protected processGetDocumentsByJobIAndPartnerId(response: HttpResponseBase): Observable<DocumentListVm> {
    const status = response.status;

    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = DocumentListVm.fromJS(resultData200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<DocumentListVm>(<any>null);
  }

  // GetDocumentByJobIAndPartnerId(partnerId: number, jobId:number, documentId:number): Observable<DocumentListVm> {
  //   let url_ = this.baseUrl + "/api/documents/{partnerId}/{jobId}/{documentId}";
  //   if (
  //     (partnerId === undefined || partnerId === null) ||
  //     (jobId === undefined || jobId === null) ||
  //     (documentId === undefined || documentId === null)
  //     )
  //       throw new Error("The parameters 'id' must be defined.");

  //   url_ = url_.replace("{partnerId}", encodeURIComponent("" + partnerId));
  //   url_ = url_.replace("{jobId}", encodeURIComponent("" + jobId));
  //   url_ = url_.replace("{documentId}", encodeURIComponent("" + documentId));
  //   url_ = url_.replace(/[?&]$/, "");

  //   let options_ : any = {
  //       observe: "response",
  //       responseType: "blob",
  //       headers: new HttpHeaders({
  //           "Accept": "application/json"
  //       })
  //   };

  //   return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
  //       return this.processGetDocumentsByJobIAndPartnerId(response_);
  //   })).pipe(_observableCatch((response_: any) => {
  //       if (response_ instanceof HttpResponseBase) {
  //           try {
  //               return this.processGetDocumentsByJobIAndPartnerId(<any>response_);
  //           } catch (e) {
  //               return <Observable<DocumentListVm>><any>_observableThrow(e);
  //           }
  //       } else
  //           return <Observable<DocumentListVm>><any>_observableThrow(response_);
  //   }));
  // }

  // protected processGetDocumentByJobIAndPartnerId(response: HttpResponseBase): Observable<DocumentListVm> {
  //   const status = response.status;

  //   const responseBlob =
  //       response instanceof HttpResponse ? response.body :
  //       (<any>response).error instanceof Blob ? (<any>response).error : undefined;

  //   let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
  //   if (status === 200) {
  //       return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
  //       let result200: any = null;
  //       let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
  //       result200 = DocumentListVm.fromJS(resultData200);
  //       return _observableOf(result200);
  //       }));
  //   } else if (status !== 200 && status !== 204) {
  //       return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
  //       return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
  //       }));
  //   }
  //   return _observableOf<DocumentListVm>(<any>null);
  // }


  GetDocumentByJobIAndPartnerId(partnerId: number, jobId:number, documentId:number): Observable<any> {
      let url_ = this.baseUrl + "/api/documents/{partnerId}/{jobId}/{documentId}";
      if (
        (partnerId === undefined || partnerId === null) ||
        (jobId === undefined || jobId === null) ||
        (documentId === undefined || documentId === null)
        )
          throw new Error("The parameters 'id' must be defined.");

      url_ = url_.replace("{partnerId}", encodeURIComponent("" + partnerId));
      url_ = url_.replace("{jobId}", encodeURIComponent("" + jobId));
      url_ = url_.replace("{documentId}", encodeURIComponent("" + documentId));
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
    deleteDocument(id: number): Observable<void> {
      let url_ = this.baseUrl + "/api/Documents/{id}";
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
          return this.processDeleteDocument(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processDeleteDocument(response_ as any);
              } catch (e) {
                  return _observableThrow(e) as any as Observable<void>;
              }
          } else
              return _observableThrow(response_) as any as Observable<void>;
      }));
  }

  protected processDeleteDocument(response: HttpResponseBase): Observable<void> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (response as any).error instanceof Blob ? (response as any).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200) {
          return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return _observableOf<void>(null as any);
          }));
      } else if (status !== 200 && status !== 204) {
          return servicesLib.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return servicesLib.throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<void>(null as any);
  }
}
