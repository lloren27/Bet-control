import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { BettinghousesService } from "../services/bettinghouses.service";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  bettingHouses:Array<any> = [];
  id:any;
  user:any
  isDataAvailable: Boolean = false;

  constructor(public Betting:BettinghousesService,public sessionService: SessionService,public router: Router,public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sessionService.userEvent.subscribe(user => {
      this.user = JSON.parse(user._body);
      console.log(user)
      this.Betting.getBettingHouses(this.user).subscribe(user =>{
        this.user = user;
        this.bettingHouses = user.bettingHouse;
        this.isDataAvailable = true
      })
    })
   
  }

 

}

