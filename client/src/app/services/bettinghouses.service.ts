import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BettinghousesService {

  BASE_URL: string = environment.BASEURL;
  options: object = { withCredentials: true };

  constructor(private http: Http,
    public sessionService: SessionService,
    private router: Router) { }

  getBettingHouses(user) {
    // console.log(user._id)
    return this.http.get(`${this.BASE_URL}/api/auth/profile/${user._id}`,this.options)
      .map((res) => res.json());
  }
  editBettingHouse(bettingHouse, id) {
    console.log(bettingHouse, id)
    return this.http.put(`${this.BASE_URL}/api/bettingHouse/income/${id}`, { newincome: bettingHouse },this.options)
      .map((res) => res.json());
  }
  addBettingHouse(name: string, bank: number) {
    console.log(name, bank);
    const newBettingHouse = {
      name: name,
      bank: bank,
    };
    return this.http
      .post(`${this.BASE_URL}/api/bettingHouse/income/new`, newBettingHouse, this.options)
      .map((res) => res.json());
  }

}


