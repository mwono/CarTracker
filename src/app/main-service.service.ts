import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
/*
/getCapacity: return count of cars in active lot/DB
/getActiveRegistered: return list of all active registered cars
/getActiveNotReg: return list of all active non-reg cars
/sendUpdate: sends update to all reg cars
*/
export class MainService {
  constructor(private http: HttpClient) { }

  SendUpdate(parkingLot: string, cap: number): Observable<any> {
    return this.http.post<any>('/sendUpdate', { lot : parkingLot , capacity : cap })
    .pipe(
      catchError(this.handleError)
    );
  }

  GetRegistered(parkingLot: string): Observable<any[]> {
    return this.http.post<any[]>('/getActiveRegistered', { lot : parkingLot })
    .pipe(
      catchError(this.handleError)
    );
  }

  GetUnregistered(parkingLot: string): Observable<any[]> {
    return this.http.post<any[]>('/getActiveNotReg', { lot : parkingLot })
    .pipe(
      catchError(this.handleError)
    );
  }

  GetCapacity(parkingLot: string): Observable<any> {
    return this.http.post<any>('/getCapacity', { lot : parkingLot })
    .pipe(
      catchError(this.handleError)
    );
  }

  GetCurrentLot(parkingLot: string): Observable<any> {
    return this.http.post('getLotInfo', { lot: parkingLot})
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
