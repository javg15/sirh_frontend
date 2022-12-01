import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../src/environments/environment';

const AUTH_URL = environment.APIS_URL + '/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_URL + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_URL + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  recoverPass(credentials,url): Observable<any> {
    return this.http.post(AUTH_URL + 'recoverpass', {
      username: credentials.username,
      url:url
    }, httpOptions);
  }

  newPass(username,token): Observable<any> {
    return this.http.post(AUTH_URL + 'newpass', {
      username: username,
      token:token
    }, httpOptions);
  }

  generarpassword(username,password,passwordconfirm,token): Observable<any> {
    return this.http.post(AUTH_URL + 'generarpass', {
      username: username,
      password:password,
      passwordconfirm:passwordconfirm,
      token:token
    }, httpOptions);
  }
}
