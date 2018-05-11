import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs';

@Injectable()
export class SessionService {

  BASE_URL = 'http://localhost:3000';
  user: any;
  userEvent: EventEmitter<any> = new EventEmitter();
  options: any = { withCredentials: true };

  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  handleUser(user?: object) {
    this.user = user;
    this.userEvent.emit(this.user);
    return this.user;
  }

  signup(user) {
    return this.http
      .post(`${this.BASE_URL}/api/auth/signup`, user, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  login(user) {
    return this.http
      .post(`${this.BASE_URL}/api/auth/login`, user, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  logout() {
    return this.http
      .post(`${this.BASE_URL}/api/auth/logout`, {}, this.options)
      .map(res => res.json())
      .map(() => this.handleUser())
      .catch((e) => Observable.throw(e.json().message));
  }

  isLoggedIn() {
    return this.http
      .get(`${this.BASE_URL}/api/auth/loggedin`, this.options)
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }
}