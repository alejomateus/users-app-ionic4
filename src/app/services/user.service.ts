import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: any;
  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
  getUsers(): Observable<any> {
    return this.http.get(`${environment.urlRestAPI}users`, this.httpOptions);
  }
  postUser(user: User): Observable<any> {
    return this.http.post(`${environment.urlRestAPI}users`, user, this.httpOptions);
  }
  putUser(user: User, userEmail: string): Observable<any> {
    return this.http.put(`${environment.urlRestAPI}users/${userEmail}`, user, this.httpOptions);
  }
  deleteUser(user: User): Observable<any> {
    return this.http.delete(`${environment.urlRestAPI}users/${user.email}`, this.httpOptions);
  }
}
