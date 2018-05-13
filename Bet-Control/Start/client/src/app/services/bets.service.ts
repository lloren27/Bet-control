import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BetsService {

  BASE_URL: string = 'http://localhost:3000/api/bet';
  options: object = { withCredentials: true };

  constructor(private http: Http, private router: Router) { }


  getBets(user) {
    console.log(user)
    return this.http.get(`${this.BASE_URL}/${user._id}`, )
      .map((res) => res.json());
  }
  getBet(id) {
    return this.http.get(`${this.BASE_URL}/detail/${id}`)
      .map((res) => res.json());
  }
  addBet(userId: string,bettingHouse: string,sport: string, betDescription: string, moneyBet: number,
    bettingFee: number) {
    const newBet = {
      userId: userId,
      bettingHouse: bettingHouse,
      sport: sport,
      betDescription: betDescription,
      moneyBet: moneyBet,
      bettingFee: bettingFee,
    };
    return this.http
      .post(`${this.BASE_URL}/newbet`, newBet, this.options)
      .map(res => {
        res.json();
        this.router.navigate(['/bets']);
      });
  }
  winBet(id) {
    return this.http
      .post(`${this.BASE_URL}/certificatedBetWin/${id}`, this.options)
      .map(res => {
        res.json();
        this.router.navigate(['/profile']);
      });

  }
  LooseBet(id) {
    return this.http
      .post(`${this.BASE_URL}/certificatedFailed/${id}`, this.options)
      .map(res => {
        res.json();
        this.router.navigate(['/profile']);
      });

  }
  cashOutBet(id, cashOut) {
    return this.http
      .post(`${this.BASE_URL}/certificatedCashOut/${id}`, { cashOut }, this.options)
      .map(res => {
        res.json();
        this.router.navigate(['/profile']);
      });

  }

}
