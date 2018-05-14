import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BetsService } from "../services/bets.service";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from '@angular/router';
import { BettinghousesService } from "../services/bettinghouses.service";
import { ClarityIcons } from "@clr/icons";
import { ClrShapePin } from "@clr/icons/shapes/essential-shapes";
import { ClrShapeStar } from "@clr/icons/shapes/social-shapes";
import { ClrShapeCar } from "@clr/icons/shapes/travel-shapes";

ClarityIcons.add({
  pin: ClrShapePin,
  star: ClrShapeStar,
  car: ClrShapeCar
});

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  bets: Array<any> = [];
  user: any;
  bettingHouses: any;
  isDataAvailable: Boolean = false;
  isDataWin: Boolean = false;
  cashs: Array<any> = [];
  losts: Array<any> = [];
  wins: Array<any> = [];
  totals: Array<any> = [];
  dineroApostado: Number = 0;
  constructor(public Bets: BetsService, public Betting: BettinghousesService, public sessionService: SessionService, private router: Router) {

  }
  ngOnInit() {
    this.sessionService.userEvent.subscribe(user => {
      this.user = JSON.parse(user._body);
      this.Betting.getBettingHouses(this.user).subscribe(user => {
        this.user = user;
        this.bettingHouses = user.bettingHouse;
      })
      this.Bets.getWinBets(this.user).subscribe(wins => this.wins = wins);
      this.Bets.getLostBets(this.user).subscribe(losts => this.losts = losts);
      this.Bets.getCashOutBets(this.user).subscribe(cashs => this.cashs = cashs);
      this.Bets.getTotalBets(this.user).subscribe(totals => {
        this.totals = totals
        this.totals.forEach (e => {
          console.log(e)
          this.dineroApostado += e.moneyBet
        })
      });
    });
  }
  gotoResult() {
    this.isDataAvailable = true;
  }
  // gotoWin(){
  //   this.isDataWin = true;
  // }

}
