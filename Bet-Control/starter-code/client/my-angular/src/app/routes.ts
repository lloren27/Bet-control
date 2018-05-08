import { Routes } from "@angular/router";
import { AuthLoginComponent } from "./auth-login/auth-login.component";
import { AuthSignupComponent } from "./auth-signup/auth-signup.component";


export const routes: Routes = [
  // { path: '', component: ThreadsComponent },
  { path: "login", component: AuthLoginComponent },
  { path: "signup", component: AuthSignupComponent },
  { path: '**', redirectTo: '' },
];