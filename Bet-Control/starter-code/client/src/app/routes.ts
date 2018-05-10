import { Routes } from "@angular/router";
import { AuthLoginComponent } from "./auth-login/auth-login.component";
import { AuthSignupComponent } from "./auth-signup/auth-signup.component";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserBetsComponent } from './user-bets/user-bets.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', component:MainComponent},
  { path: "login", component: AuthLoginComponent },
  { path: "signup", component: AuthSignupComponent },
  { path: "profile", component: UserProfileComponent },
  { path: "bets", component: UserBetsComponent },
  { path: '**', redirectTo: '' },
];