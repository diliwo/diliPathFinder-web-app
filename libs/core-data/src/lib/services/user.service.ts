import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CpasAuthService } from '@cpas/authentication-ng-lib';
import { User } from '@frontend/api-interface';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authService: CpasAuthService,
    private http: HttpClient
  ) { }

  public getUsers(searchText: string): Observable<User[]> {
    let url = this.apiUrl + 'user';
    if (searchText !== undefined && searchText.trim().length > 0) {
      url += '?searchText=' + searchText;
    }
    return this.http
      .get<User[]>(url, { headers })
      .pipe(
        map((data: User[]) => {
          let resultUsers: User[] = [];
          if (data != null) {
            resultUsers = data.filter(u => !(u.softDeleted));
            console.trace("getUsers - filteredUsers: ", resultUsers);
          }
          return resultUsers;
        }),
        catchError((error: any) => {
          let msg =
            'Une erreur est survenue lors de la récupération de la liste des utilisateurs !';
          if (typeof error.error === 'string') {
            msg += error.error;
          } else if (typeof error.statusText === 'string') {
            msg += error.statusText;
          } else {
            msg += 'inconnue !';
          }
          return of([]);
        })
      );
  }

  getUserBySamAccountName(samAccountName: string): Observable<User> {
    let url = this.apiUrl + 'user';

    if (samAccountName !== undefined && samAccountName.trim().length > 0) {
      url += '/' + samAccountName;
    }

    return this.http
      .get<User>(url, { headers })
      .pipe(
        map((data: User) => {
          return data;
        }),
        catchError((error: any) => {
          let msg =
            'Une erreur est survenue lors de la récupération de l\'utilisateur !';
          if (typeof error.error === 'string') {
            msg += error.error;
          } else if (typeof error.statusText === 'string') {
            msg += error.statusText;
          } else {
            msg += 'inconnue !';
          }
          console.log('getUserBySamAccountName - error: ' + msg);
          return of(null!);
        })
      );
  }

  getCurrentUserDetails(): Observable<User> {
    const url =
      this.apiUrl +
      'user/login?userName=' +
      encodeURIComponent(this.authService.getCurrentUserUniqueName());

    return this.http
      .get<User>(url, { headers })
      .pipe(
        map((data: User) => {
          return data;
        }),
        catchError((error: any) => {
          let msg =
            'Une erreur est survenue lors de la récupération des détails d\'un utilisateur !';
          if (typeof error.error === 'string') {
            msg += error.error;
          } else if (typeof error.statusText === 'string') {
            msg += error.statusText;
          } else {
            msg += 'inconnue !';
          }
          return of(undefined!);
        })
      );
  }
}
