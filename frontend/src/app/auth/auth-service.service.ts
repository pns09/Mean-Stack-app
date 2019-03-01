import { Injectable } from '@angular/core';
// manually defined imports
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  $auth = new BehaviorSubject(this.checkLogin());

  userSubject = new BehaviorSubject<User>(null);

  constructor(private _http: HttpClient, private _router: Router) {
    if (this.checkLogin()) {
      this.userSubject.next(new JwtHelperService().decodeToken(this.checkLogin()));
    }
  }


  get user(): BehaviorSubject<User> {
    return this.userSubject;
  }

  checkLogin() {
    return localStorage.getItem('token');
  }

  login(credentials) {
    return this._http.post('http://localhost:3000/api/authenticate', credentials);

  }

  setToken(token: string) {
    localStorage.setItem('token', token);

  }

  logout() {
    localStorage.removeItem('token');
    this.$auth.next(this.checkLogin());
    this._router.navigate(['/login']);

  }
}
export interface User {
  name: string;
}
