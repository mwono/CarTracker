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

  SendUpdate(): Observable<any> {
    return this.http.get<any>('ENDPOINTHERE');
  }

  GetRegistered(): Observable<any[]> {
    return this.http.get<any[]>('ENDPOINTHERE');
  }

  GetUnregistered(): Observable<any[]> {
    return this.http.get<any[]>('ENDPOINTHERE');
  }
}
