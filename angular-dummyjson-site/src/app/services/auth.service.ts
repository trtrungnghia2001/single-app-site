import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth, ILogin } from '../modules';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `https://dummyjson.com/auth/`;
  http = inject(HttpClient);
  auth!: IAuth | null;

  constructor() {}

  login(auth: ILogin): Observable<IAuth> {
    return this.http.post<IAuth>(this.baseUrl + `login`, auth);
  }
  logout() {
    this.auth = null;
    localStorage.removeItem('auth');
  }

  setAuth(value: IAuth) {
    this.auth = value;
    if (this.auth) {
      localStorage.setItem('auth', JSON.stringify(this.auth));
    }
  }
  getAuth() {
    const getLocal = localStorage.getItem('auth');
    if (getLocal) {
      this.auth = JSON.parse(getLocal) as IAuth;
    }
  }
}
