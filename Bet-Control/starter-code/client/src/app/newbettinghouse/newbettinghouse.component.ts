import { Component, OnInit } from '@angular/core';
import { BettinghousesService } from '../services/bettinghouses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newbettinghouse',
  templateUrl: './newbettinghouse.component.html',
  styleUrls: ['./newbettinghouse.component.css']
})
export class NewbettinghouseComponent implements OnInit {
  name: string = "";
  bank: number = 0;

  constructor(public Betting:BettinghousesService, public router: Router) { }

  ngOnInit() {}

  createNewBettingHouse() {
    
    this.Betting.addBettingHouse(this.name, this.bank).subscribe()
  
  }

}
