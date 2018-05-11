import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { BettinghousesService } from "../services/bettinghouses.service";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  bettingHouses:Array<any> = [];

  constructor(public Betting:BettinghousesService,public sessionService: SessionService,public router: Router) { }

  ngOnInit() {
    this.Betting.getBettingHouses().subscribe( bettingHouses => this.bettingHouses = bettingHouses);
  }
  gotoBets() {
    this.router.navigate(['/bets']);
  }
}
