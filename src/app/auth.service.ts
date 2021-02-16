import { Injectable } from '@angular/core';
import { API_URL } from './app.constant';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './classes/error';
import { Router } from '@angular/router';


export const AUTH_SUFFIX = 'employee/';

@Injectable()
export class AuthService {
  router: Router;
  auth_token : string;
  // errorHandler: Error = new Error(this.router);
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorService
  ) { }

  /**
   * @method Login
   * @param payload: {user: string, password: string}
   * @return Observable of Response
   */

  login(payload: { user: string, password: string }): Observable<any> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let body: HttpParams = new HttpParams();
    body = body.append('email', payload.user);
    body = body.append('password', payload.password);



    return this.http.post(`${API_URL}${AUTH_SUFFIX}login/`, body.toString(), { headers })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  // logout API
  logout() {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let body = new HttpParams();

    return this.http.post(`${API_URL}${AUTH_SUFFIX}logout/`, body.toString(), { headers })
      .pipe(
        catchError(this.errorHandler.handleError)
      );

  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

}
