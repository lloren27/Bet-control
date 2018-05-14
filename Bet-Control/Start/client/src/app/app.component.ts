import { Component } from '@angular/core';
import { SessionService } from "./services/session.service";
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bet-Control';
  constructor(public sessionService: SessionService, public router: Router) {
    // this.sessionService.userEvent.subscribe(user => {
    //   console.log("User App Component", user)
    // });
  }

  ngOnInit() {}
  logout() {
    this.sessionService.logout().subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
  gotoBets() {
    this.router.navigate(['/bets']);
  }
}

