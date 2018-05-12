import { Component, OnInit } from '@angular/core';
import { BetsService } from "../services/bets.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-newbet',
  templateUrl: './newbet.component.html',
  styleUrls: ['./newbet.component.css']
})
export class NewbetComponent implements OnInit {
  sport: string;
  bet:any;
  bettingFee: number;
  betDescription: string;
  moneyBet: number;
  bhouseName: Array<String>;
  constructor(public Bet: BetsService, public router: Router) { }

  ngOnInit() {
    this.bhouseName = ['Bet365', 'Betfair', 'Sportium', 'MarcaApuestas',
      'Wanabet', 'WilliamHill', 'Bwin', '888sports']
  }
  createNewBet(sport, betDescription,moneyBet,bettingFee,bettingHouse,userId) {
    console.log(sport, betDescription,moneyBet,bettingFee,bettingHouse,userId)
    this.Bet.addBet(sport, betDescription,moneyBet,bettingFee,bettingHouse,userId).subscribe(bet => this.bet = bet)

  }
}


