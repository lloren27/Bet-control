import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs';

@Injectable()
export class BetsService {

BASE_URL: string = 'http://localhost:3000/api/bet';

constructor(private http: Http) { }
getBet() {
    return this.http.get(`${this.BASE_URL}`)
      .map((res) => res.json());
  }

}
