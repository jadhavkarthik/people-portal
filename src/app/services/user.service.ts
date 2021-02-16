import { Injectable } from '@angular/core';
import { API_URL } from '../app.constant';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from '../classes/error';
import { Router } from '@angular/router';
const AUTH_SUFFIX = 'employee/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  router: Router;
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorService
  ) { }

  getUsers(payload: any): Observable<any> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');


    return this.http.get(`${API_URL}${AUTH_SUFFIX}list/?search=${payload.search_string}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  register(payload: any): Observable<any> {

    const body: FormData = new FormData();

    body.append('name', payload.name);
    body.append('role', payload.role);
    body.append('position', payload.position);
    body.append('team', payload.team);
    body.append('phone_no', payload.phone_no);
    body.append('email', payload.email);
    if (!payload.id) {
      body.append('password', payload.password);
      return this.http.post(`${API_URL}${AUTH_SUFFIX}add/`, body)
        .pipe(
          catchError(this.errorHandler.handleError)
        );
    } else {
      return this.http.put(`${API_URL}${AUTH_SUFFIX}${payload.id}/`, body)
        .pipe(
          catchError(this.errorHandler.handleError)
        );
    }
  }

  delete(payload: any): Observable<any> {
    return this.http.delete(`${API_URL}${AUTH_SUFFIX}${payload.id}/`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}
