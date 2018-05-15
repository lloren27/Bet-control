import { Component, OnInit } from '@angular/core';
import { BetsService } from "../services/bets.service";
import { Router } from '@angular/router';
import { SessionService } from "../services/session.service";
import { BettinghousesService } from "../services/bettinghouses.service";


@Component({
  selector: 'app-newbet',
  templateUrl: './newbet.component.html',
  styleUrls: ['./newbet.component.css']
})
export class NewbetComponent implements OnInit {
  sport: string;
  bettingHouses:Array<any> = [];
  bet:any;
  bettingFee: number;
  betDescription: string;
  moneyBet: number;
  bhouseName: Array<String>;
  user:any
  isDataAvailable: Boolean = false;
  sports: Array<String>;
  constructor(public Bet: BetsService, public Betting:BettinghousesService, public router: Router,public sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.userEvent.subscribe(user => {
      this.user = JSON.parse(user._body);
      console.log(user)
      this.Betting.getBettingHouses(this.user).subscribe(user =>{
        this.user = user;
        this.bettingHouses = user.bettingHouse;
    })
  })
  this.sports = ['Futbol', 'Baloncesto', 'Tenis', 'F1',
      'Motociclismo', 'Golf', 'Ciclismo', 'eSports','Carreras de Galgos','Carreras de Caballos']
 
  }
  createNewBet(userId,bettingHouse,betDescription,sport,moneyBet,bettingFee) {

    console.log(sport, betDescription,moneyBet,bettingFee,bettingHouse,userId)
    this.Bet.addBet(userId,bettingHouse,betDescription,sport,moneyBet,bettingFee).subscribe(() => {
      
    })

  }
}


