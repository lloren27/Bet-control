import { Component } from '@angular/core';
import { SessionService } from "./services/session.service";
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";
import { ClarityIcons } from "@clr/icons";
import { ClrShapePin } from "@clr/icons/shapes/essential-shapes";
import { ClrShapeStar } from "@clr/icons/shapes/social-shapes";
import { ClrShapeCar } from "@clr/icons/shapes/travel-shapes";
import { BetsService } from "./services/bets.service";

ClarityIcons.add({
  pin: ClrShapePin,
  star: ClrShapeStar,
  car: ClrShapeCar
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bets: Array<any> = [];
  user: any;
  title = 'Bet-Control';
  bol:boolean = false;
  constructor(public sessionService: SessionService, public router: Router,public Bets: BetsService) {
    // this.sessionService.userEvent.subscribe(user => {
    //   console.log("User App Component", user)
    // });

  }

  ngOnInit() {
    this.sessionService.isLoggedIn().subscribe(user => {
      this.user = JSON.parse(user._body);
      this.Bets.getBets(this.user).subscribe(bets => {
        this.bets = bets;
        console.log("Holiii",bets.length)
        this.bol = true;
      })
    })
  
  }
  logout() {
    this.sessionService.logout().subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
  gotoBets() {
    this.router.navigate(['/bets']);
  }
}

