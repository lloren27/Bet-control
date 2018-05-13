import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import 'rxjs';

@Injectable()
export class BettinghousesService {

  BASE_URL: string = 'http://localhost:3000/api/bettingHouse';
  options: object = { withCredentials: true };

  constructor(private http: Http,
    public sessionService: SessionService,
    private router: Router) { }

  getBettingHouses(user) {
    return this.http.get(`http://localhost:3000/api/auth/profile/${user._id}`)
      .map((res) => res.json());
  }
  editBettingHouse(bettingHouse, id) {
    console.log(bettingHouse, id)
    return this.http.put(`${this.BASE_URL}/income/${id}`, { newincome: bettingHouse })
      .map((res) => res.json());
  }
  addBettingHouse(name: string, bank: number) {
    console.log(name, bank);
    const newBettingHouse = {
      name: name,
      bank: bank,
    };
    return this.http
      .post(`${this.BASE_URL}/income/new`, newBettingHouse, this.options)
      .map(res => {
        res.json();
        this.router.navigate(['/profile']);
      });
  }

}

