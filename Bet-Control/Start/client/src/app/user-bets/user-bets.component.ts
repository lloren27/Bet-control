import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { BetsService } from "../services/bets.service";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-bets',
  templateUrl: './user-bets.component.html',
  styleUrls: ['./user-bets.component.css']
})
export class UserBetsComponent implements OnInit {
  bets:Array<any> = [];
  user:any;
  constructor(public Bets:BetsService, public sessionService: SessionService, private router: Router) { 
    
  }

  ngOnInit() {    
    this.sessionService.userEvent.subscribe(user => {
      this.user = JSON.parse(user._body);
      this.Bets.getBets(this.user).subscribe( bets => this.bets = bets);
    });
    
  }

}
