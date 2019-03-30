import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  constructor(private http: HttpClient) { }

  SendUpdate(lot: string): Observable<any> {
    return this.http.post<any>('ENDPOINTHERE', lot);
  }

  GetRegistered(lot: string): Observable<any[]> {
    return this.http.post<any[]>('ENDPOINTHERE', lot);
  }

  GetUnregistered(lot: string): Observable<any[]> {
    return this.http.post<any[]>('ENDPOINTHERE', lot);
  }
}
