import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl =  environment.apiUrl + 'user/';
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json;',  });
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.headers = headers.set('Authorization', token);
    }
  }

  getUsers(type = ''): Observable<User[]> {
    this.createAuthorizationHeader(this.headers);
    const params = new HttpParams().set('type', type);
    console.log(type);
    return this.http.get<User[]>(this.baseUrl + 'users', {headers: this.headers, params: params});
  }

  getUser(id: number): Observable<User> {
    this.createAuthorizationHeader(this.headers);
    return this.http.get<User>(this.baseUrl + 'user/' + id,  {headers: this.headers});
  }

  updateUser(user: User) {
    this.createAuthorizationHeader(this.headers);
    return this.http.put<User>(this.baseUrl + 'user', user, {headers: this.headers});
  }

  addRole(userId: number, role: string) {
    this.createAuthorizationHeader(this.headers);
    return this.http.put<User>(this.baseUrl + 'addrole', {id: userId, role}, {headers: this.headers});
  }
}
