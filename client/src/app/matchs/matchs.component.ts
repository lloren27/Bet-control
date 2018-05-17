import { Component, OnInit } from '@angular/core';
import { BetsService } from "../services/bets.service";
import { Router } from '@angular/router';
import { SessionService } from "../services/session.service";


@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.css']
})
export class MatchsComponent implements OnInit {
  matchs:any;
  id:any;
  sports:any;

  constructor(public Bet: BetsService) { }

  ngOnInit() {
    this.sports = ['soccer', 'basketball', 'baseball', 'tennis','handball']
  
    
  }
  
  listMatches(sport){
    this.Bet.getMatchs(sport).subscribe(matchs => {
      this.matchs = matchs; 
      console.log (matchs)
    });
  }

}
