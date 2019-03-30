import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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

  SendUpdate(lot: string): Observable<any> {
    return this.http.post<any>('/sendUpdate', lot);
  }

  GetRegistered(lot: string): Observable<any[]> {
    return this.http.post<any[]>('/getActiveRegistered', lot);
  }

  GetUnregistered(lot: string): Observable<any[]> {
    return this.http.post<any[]>('/getActiveNotReg', lot);
  }

  GetCapacity(lot: string): Observable<any> {
    return this.http.post<any>('/getCapacity', lot);
  }
}
