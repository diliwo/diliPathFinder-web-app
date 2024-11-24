import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';

export function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
  }

  export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
  }

  export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
  }

  export interface IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    extensions?: { [key: string]: any; } | undefined;
  }

  export class ProblemDetails implements IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    extensions?: { [key: string]: any; } | undefined;

    static fromJS(data: any): ProblemDetails {
      data = typeof data === 'object' ? data : {};
      let result = new ProblemDetails();
      result.init(data);
      return result;
  }

    constructor(data?: IProblemDetails) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.type = data["type"];
            this.title = data["title"];
            this.status = data["status"];
            this.detail = this.pruneErrorsDetails(data.errors);;
            this.instance = data["instance"];
            if (data["extensions"]) {
                this.extensions = {} as any;
                for (let key in data["extensions"]) {
                    if (data["extensions"].hasOwnProperty(key))
                        this.extensions![key] = data["extensions"][key];
                }
            }
        }
    }

    toJSON(data?: any) {
      console.log(data);
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["title"] = this.title;
        data["status"] = this.status;
        data["detail"] = this.detail;
        data["instance"] = this.instance;
        if (this.extensions) {
            data["extensions"] = {};
            for (let key in this.extensions) {
                if (this.extensions.hasOwnProperty(key))
                    data["extensions"][key] = this.extensions[key];
            }
        }
        return data;
    }

    pruneErrorsDetails(errors) : string{
      let result = '';
      if(errors != null){
        if(errors["Property"]){
          result = errors["Property"]["0"];
        } else if(errors["PatchDoc.Operations[0].Property"]){
          result = errors["PatchDoc.Operations[0].Property"]["0"];
        }
      }
      return result;
    }
  }

  export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
