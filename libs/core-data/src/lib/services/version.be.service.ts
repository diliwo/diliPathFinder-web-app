import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as servicesLib from './share';
@Injectable({
  providedIn: 'root'
})
export class VersionBeService {

  

  constructor(private http: HttpClient, @Inject(servicesLib.API_BASE_URL) private apiUrl: string) { }

  getBeVersion(): Observable<any> {
    if(!this.apiUrl.endsWith('/')){
      this.apiUrl = this.apiUrl + '/';
    }
    return this.http.get(`${this.apiUrl}api/version`,{ responseType: 'text' });
  }
}