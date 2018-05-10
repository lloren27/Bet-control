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


@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthSignupComponent,

],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    ClarityModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
