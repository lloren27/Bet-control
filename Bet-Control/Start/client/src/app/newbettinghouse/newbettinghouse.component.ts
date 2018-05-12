import { Component, OnInit } from '@angular/core';
import { BettinghousesService } from '../services/bettinghouses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newbettinghouse',
  templateUrl: './newbettinghouse.component.html',
  styleUrls: ['./newbettinghouse.component.css']
})
export class NewbettinghouseComponent implements OnInit {
  user: any;
  bettinghouse: string;
  bettinghouses: Array<object>;
  name: string;
  bank: number;
  bhouseName: Array<String>;
  constructor(public Betting: BettinghousesService, public router: Router) { }

  ngOnInit() {
    this.bhouseName = ['Bet365', 'Betfair', 'Sportium', 'MarcaApuestas',
      'Wanabet', 'WilliamHill', 'Bwin', '888sports']
  }

  createNewBettingHouse(name, bank) {
    console.log(name, bank)
    this.Betting.addBettingHouse(name, bank).subscribe()

  }


}

