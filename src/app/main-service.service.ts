import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MainService {
    headers = new HttpHeaders().set('Content-Type', 'application/json')
        .append("Access-Control-Allow-Origin", "*")
    constructor(private http: HttpClient) { }

    SendUpdate(parkingLot: string, cap: number): Observable<any> {
        return this.http.post<any>('/sendUpdate', { lot: parkingLot, capacity: cap }, { headers: this.headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    GetRegistered(parkingLot: string): Observable<any[]> {
        return this.http.post<any[]>('https://us-central1-parking-solution-463a9.cloudfunctions.net/registered', { lot: parkingLot }, { headers: this.headers })
            .pipe(timeout(5000),
            map((res: any[]) => {
                return res;
            }),
                catchError(this.handleError)
            );
    }

    GetUnregistered(parkingLot: string): Observable<any[]> {
        return this.http.post<any[]>('https://us-central1-parking-solution-463a9.cloudfunctions.net/unregistered', { lot: parkingLot }, { headers: this.headers })
            .pipe(timeout(5000),
            map((res: any[]) => {
                return res;
            }),
                catchError(this.handleError)
            );
    }

    GetCurrentLot(parkingLot: string): Observable<any> {
        return this.http.post('https://us-central1-licese-plate-scanner.cloudfunctions.net/lotCapacity', { lot: parkingLot }, { headers: this.headers })
        .pipe(timeout(5000),
        map((res: any[]) => {
            return res;
        }),
            catchError(this.handleError)
        );
    }

    deleteUsers(plateId: string[], r: boolean): Observable<any[]> {
        console.log(JSON.stringify({ list: plateId, registered: r }));
        return this.http.post<any[]>('tempEndpoint', JSON.stringify({ list: plateId, registered: r }), { headers: this.headers }).pipe(catchError(this.handleError));
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
