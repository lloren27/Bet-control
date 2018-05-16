import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { BetsService } from "../services/bets.service";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bets-details',
  templateUrl: './bets-details.component.html',
  styleUrls: ['./bets-details.component.css']
})
export class BetsDetailsComponent implements OnInit {
  cashOut:number
  bet: any;
  id:any;

  constructor(
    route: ActivatedRoute,
    public Bets:BetsService,
    public sessionService: SessionService, 
    public router: Router) { 
    
      route.params.subscribe(params => {
        this.id = params.id
    Bets.getBet(params.id).subscribe(bet => {
    this.bet = bet; 
    });
  });
}

  ngOnInit() {

  }

  betWin(){
    this.Bets.winBet(this.id).subscribe(e => console.log(e))
  }

  betLoose(){
    this.Bets.LooseBet(this.id).subscribe(e => console.log(e))
  }

  betCashout(cashOut){
    this.Bets.cashOutBet(this.id,this.cashOut).subscribe(e => console.log(e))
    console.log(this.cashOut)
  }
   
}
