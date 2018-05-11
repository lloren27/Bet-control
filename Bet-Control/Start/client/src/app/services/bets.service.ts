import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs';

@Injectable()
export class BetsService {

BASE_URL: string = 'http://localhost:3000/api/bet';

constructor(private http: Http) { }

getBet(user) {
  console.log(user)
    return this.http.get(`${this.BASE_URL}/${user._id}`, )
      .map((res) => res.json());
  }

}
