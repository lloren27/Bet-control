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
  bettingHouses: Array<any> = [];
  bet: any;
  bets: Array<any> = [];
  bettingFee: number;
  betDescription: string;
  moneyBet: any;
  bhouseName: Array<String>;
  user: any
  isDataAvailable: Boolean = false;
  sports: Array<String>;
  bettingHousesBank: any;
  Bank: any;
  bankinter: any;
  error = '';
  constructor(public Bet: BetsService, public Betting: BettinghousesService, public router: Router, public sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.isLoggedIn().subscribe(user => {
      this.user = JSON.parse(user._body);
      // console.log(user)
      this.Betting.getBettingHouses(this.user).subscribe(user => {
        this.user = user;
        this.bettingHouses = user.bettingHouse;
      })
    })
    this.sports = ['Futbol', 'Baloncesto', 'Tenis', 'F1',
      'Motociclismo', 'Golf', 'Ciclismo', 'eSports', 'Carreras de Galgos', 'Carreras de Caballos']
  }
  createNewBet(userId, bettingHouse, betDescription, sport, moneyBet, bettingFee) {
    var banco;
    this.bettingHouses.forEach(e => {
      if (e._id == bettingHouse) {
        banco = e
      }
    })
    if (moneyBet > banco.bank) {
      this.error = "No tienes Cash disponible en esta casa de apuestas"
    } else {
      this.Bet.addBet(userId, bettingHouse, betDescription, sport, moneyBet, bettingFee).subscribe(() => this.router.navigate(['/profile']));
    }
  }
}


