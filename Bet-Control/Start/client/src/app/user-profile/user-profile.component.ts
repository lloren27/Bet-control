import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { BettinghousesService } from "../services/bettinghouses.service";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  bettingHouses:Array<any> = [];
  id:any;

  constructor(public Betting:BettinghousesService,public sessionService: SessionService,public router: Router,public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.id= params.id;
     });
    this.Betting.getBettingHouses(this.id).subscribe( bettingHouses => this.bettingHouses = bettingHouses);
  }
  gotoBets() {
    this.router.navigate(['/bets']);
  }
}
