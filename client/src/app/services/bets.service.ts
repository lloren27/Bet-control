import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class BetsService {

  BASE_URL: string = environment.BASEURL;
  options: object = { withCredentials: true };

  constructor(private http: Http, private router: Router) { }


  getBets(user) {
    console.log(this.BASE_URL)
    return this.http.get(`${this.BASE_URL}/api/bet/${user._id}`,this.options )
      .map((res) => res.json());
  }
  getBet(id) {
    return this.http.get(`${this.BASE_URL}/api/bet/detail/${id}`,this.options)
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
      .post(`${this.BASE_URL}/api/bet/newbet`, newBet, this.options)
      .map(res => res.json());
        //this.router.navigate(['/bets']);
      //});
  }
  winBet(id) {
    return this.http
      .post(`${this.BASE_URL}/api/bet/certificatedBetWin/${id}`, this.options)
      .map(res => {
        res.json();
        this.router.navigate(['/profile']);
      });

  }
  LooseBet(id) {
    return this.http
      .post(`${this.BASE_URL}/api/bet/certificatedFailed/${id}`, this.options)
      .map(res => {
        res.json();
        this.router.navigate(['/profile']);
      });

  }
  cashOutBet(id, cashOut) {
    return this.http
      .post(`${this.BASE_URL}/api/bet/certificatedCashOut/${id}`, { cashOut }, this.options)
      .map(res => {
        res.json();
        this.router.navigate(['/profile']);
      });

  }
  getWinBets(user) {
    // console.log(user)
    return this.http.get(`${this.BASE_URL}/api/bet/win/${user._id}`,this.options )
      .map((res) => res.json());
  }
  getLostBets(user) {
    // console.log(user)
    return this.http.get(`${this.BASE_URL}/api/bet/lost/${user._id}`,this.options )
      .map((res) => res.json());
  }
  getCashOutBets(user) {
    // console.log(user)
    return this.http.get(`${this.BASE_URL}/api/bet/cashout/${user._id}`,this.options )
      .map((res) => res.json());
  }
  getTotalBets(user) {
    // console.log(user)
    return this.http.get(`${this.BASE_URL}/api/bet/total/${user._id}`,this.options )
      .map((res) => res.json());
  }

}
