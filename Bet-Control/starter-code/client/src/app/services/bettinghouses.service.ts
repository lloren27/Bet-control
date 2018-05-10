import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs';

@Injectable()
export class BettinghousesService {

BASE_URL: string = 'http://localhost:3000/api/bettingHouse';

constructor(private http: Http) {}

getBettingHouses() {
    return this.http.get(`${this.BASE_URL}`)
      .map((res) => res.json());
  }

}
