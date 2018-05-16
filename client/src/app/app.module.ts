import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SessionService } from "./services/session.service";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {routes} from './routes';
import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { ClarityModule } from "@clr/angular";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BettinghousesService } from "./services/bettinghouses.service";
import { UserBetsComponent } from './user-bets/user-bets.component';
import { BetsService } from "./services/bets.service";
import { MainComponent } from './main/main.component';
import { NewbettinghouseComponent } from './newbettinghouse/newbettinghouse.component';
import { EditbettinghouseComponent } from './editbettinghouse/editbettinghouse.component';
import { BetsDetailsComponent } from './bets-details/bets-details.component';
import { NewbetComponent } from './newbet/newbet.component';
import { StatisticsComponent } from './statistics/statistics.component';
import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts';
import { MatchsComponent } from './matchs/matchs.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    UserProfileComponent,
    UserBetsComponent,
    MainComponent,
    NewbettinghouseComponent,
    EditbettinghouseComponent,
    BetsDetailsComponent,
    NewbetComponent,
    StatisticsComponent,
    MatchsComponent
],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    ClarityModule,
    ChartsModule
  ],
  providers: [SessionService,BettinghousesService,BetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
