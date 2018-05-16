import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BetsService {

  BASE_URL: string = 'http://api.football-data.org/v1/fixtures/';
  options: object = { withCredentials: true };

  constructor(private http: Http, private router: Router) { }


  getfixtures() {
    // console.log(user)
    return this.http.get(`${this.BASE_URL}`,this.options )
      .map((res) => res.json());
  }
}
  