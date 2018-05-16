import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BetsService } from "../services/bets.service";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from '@angular/router';
import { BettinghousesService } from "../services/bettinghouses.service";
import * as moment from 'moment';

@Component({
  selector: 'app-user-bets',
  templateUrl: './user-bets.component.html',
  styleUrls: ['./user-bets.component.css']
})
export class UserBetsComponent implements OnInit {
  bets: Array<any> = [];
  user: any;
  bettingHouses: any;
  fechas: any;
  año: any;
  mes: any;
  dia: any;
  total: any
  bettingHousesName:any;
  card:Array<any> = [];
  flag: boolean = false;
  constructor(public Bets: BetsService, public Betting: BettinghousesService, public sessionService: SessionService, private router: Router) {

  }

  ngOnInit() {
    this.sessionService.isLoggedIn().subscribe(user => {
      this.user = JSON.parse(user._body);
      this.Betting.getBettingHouses(this.user).subscribe(user => {
        this.user = user;
        this.bettingHouses = user.bettingHouse;


        this.Bets.getBets(this.user).subscribe(bets => {
          this.bets = bets
          console.log (bets)
  
          this.bettingHouses.forEach (bH =>{
            this.bets.forEach(e=>{
              // console.log(e)
            if(e.bettingHouse == bH._id){ 
              // console.log("en if")
              let a = { 
                bettingHouse : bH.name,
                betDescription : e.betDescription,
                sport : e.sport,
                created_at : e.created_at,
                _id: e._id
              }
              // console.log(e)
              this.card.push(a)
            }
            })
            console.log("PWPW",this.card)
            this.flag = true
            console.log(this.flag)
          })
          
  
          //console.log("APUESTAS", bets)
          this.bets.forEach(e => {
            this.fechas = e.created_at
  
            this.año = this.fechas.split('').splice(0, 4).join("");
            this.mes = this.fechas.split('').splice(5, 2).join("");
            this.dia = this.fechas.split('').splice(8, 2).join("");
  
            this.total = [this.dia,this.mes,this.año]
  
            // console.log(this.total)
            // console.log(typeof this.fechas)
  
            
          });
      })
      // var pepe = []
     

      });
      this.Betting.getBettingHouses(this.user).subscribe(user =>{
        this.user = user;
        this.bettingHouses = user.bettingHouse;
        this.bettingHouses.forEach (e =>{
          this.bettingHousesName = e.name 

          //console.log (this.bettingHousesName)


        })
    })
  })


} }

