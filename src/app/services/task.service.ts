import { Injectable } from '@angular/core';
import { API_URL } from '../app.constant';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../classes/error';


export const ROOM_SUFFIX = 'conference/room/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) {

  }

  addRoom(payload: any): Observable<any> {

    const body: FormData = new FormData();

    body.append('name', payload.name);
    body.append('booking_email', payload.booking_email);
    body.append('sitting', payload.sitting);

    return this.http.post(`${API_URL}${ROOM_SUFFIX}create/`, body)
      .pipe(
        catchError(this.error.handleError)
      );
  }


  register(payload: any): Observable<any> {
    const body: FormData = new FormData();
    if (!payload.id) {
      body.append('name', payload.name);
      body.append('booking_email', payload.booking_email);
      body.append('sitting', payload.sitting);
      return this.http.post(`${API_URL}${ROOM_SUFFIX}create/`, body)
        .pipe(
          catchError(this.error.handleError)
        );
    } else {
      body.append('current_status', payload.current_status);
      return this.http.put(`${API_URL}${ROOM_SUFFIX}${payload.id}/`, body)
        .pipe(
          catchError(this.error.handleError)
        );
    }
  }

  getRooms(payload: any): Observable<any> {
  
    return this.http.get(`${API_URL}${ROOM_SUFFIX}list/?search=${payload.search_string}`)
      .pipe(
        catchError(this.error.handleError)
      );
  }

  delete(payload: any): Observable<any> {
    return this.http.delete(`${API_URL}${ROOM_SUFFIX}${payload.id}/`)
      .pipe(
        catchError(this.error.handleError)
      );
  }

}
