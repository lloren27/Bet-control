import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BetsService } from "../services/bets.service";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from '@angular/router';
import { BettinghousesService } from "../services/bettinghouses.service";
import { ClarityIcons } from "@clr/icons";
import { ClrShapePin } from "@clr/icons/shapes/essential-shapes";
import { ClrShapeStar } from "@clr/icons/shapes/social-shapes";
import { ClrShapeCar } from "@clr/icons/shapes/travel-shapes";
import { NumberFormatStyle } from '@angular/common';
import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts';

ClarityIcons.add({
  pin: ClrShapePin,
  star: ClrShapeStar,
  car: ClrShapeCar
});

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  bets: Array<any> = [];
  user: any;
  bettingHouses: any;
  isDataAvailable: Boolean = false;
  isFalse: Boolean = false;
  isDataWin: Boolean = false;
  cashs: Array<any> = [];
  losts: Array<any> = [];
  pending: Array<any> = [];
  wins: Array<any> = [];
  totals: Array<any> = [];
  dineroApostado: number = 0;
  ganadas: number = 0;
  tCashout:number=0;
  tganado:any;
  public pieChartLabels:string[] = ['Gastado', 'Ingresado', 'Beneficio Neto'];
  public pieChartType:string = 'pie';
  public radarChartLabels:string[] = ['Futbol', 'Baloncesto', 'Tenis', 'F1', 'Motociclismo', 'Golf', 'eSports','Carreras de Galgos',"Carreras de Caballos"];
  public radarChartType:string = 'radar';
  public chartOptions:any = { 
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 5,
        stepSize: 0.5
      }
    }
  }
  pieChartData:number[]
  radarChartData:any;
  futbol:any;
  baloncesto:any;
  tenis:any;
  f1:any;
  motos:any;
  golf:any;
  eSports:any;
  galgos:any;
  caballos:any;
  porDeporte:Boolean = false;

  


  

  constructor(public Bets: BetsService, public Betting: BettinghousesService, public sessionService: SessionService, private router: Router) {

  }
  ngOnInit() {
    this.sessionService.userEvent.subscribe(user => {
      this.user = JSON.parse(user._body);
      this.Betting.getBettingHouses(this.user).subscribe(user => {
        this.user = user;
        this.bettingHouses = user.bettingHouse;
      })
      ///////////////////////////////////Devuelve el dinero ganado en una apuesta acertada///////////////
      this.Bets.getBets(this.user).subscribe(pending =>this.pending = pending)
      this.Bets.getWinBets(this.user).subscribe(wins => {
        this.wins = wins
        this.wins.forEach (e => {
          this.ganadas += (Number(e.moneyBet) * Number(e.bettingFee))
        })
      });
      ///////////////////////////////Devuelve el dinero ganado por CashOut//////////////////  
      this.Bets.getLostBets(this.user).subscribe(losts => this.losts = losts);
      this.Bets.getCashOutBets(this.user).subscribe(cashs => {
        this.cashs = cashs
        this.cashs.forEach(e =>{
          this.tCashout +=e.parcialGain
        })
      })
      ///////////////////////////////////Devuelve el total de apuestas///////////////
      this.Bets.getTotalBets(this.user).subscribe(totals => {
        this.totals = totals
        //////////////////////////////Apuestas por depote/////////////////////////////
        this.futbol=(this.totals.filter(apuesta => apuesta.sport == "Futbol"))
        this.baloncesto=(this.totals.filter(apuesta => apuesta.sport == "Baloncesto"))
        this.tenis=(this.totals.filter(apuesta => apuesta.sport == "Tenis"))
        this.f1=(this.totals.filter(apuesta => apuesta.sport == "F1"))
        this.motos=(this.totals.filter(apuesta => apuesta.sport == "Motociclismo"))
        this.golf=(this.totals.filter(apuesta => apuesta.sport == "Golf"))
        this.eSports=(this.totals.filter(apuesta => apuesta.sport == "eSports"))
        this.galgos=(this.totals.filter(apuesta => apuesta.sport == "Carreras de Galgos"))
        this.caballos=(this.totals.filter(apuesta => apuesta.sport == "Carreras de Caballos"))

        ////////////////////////////////total dinero apostado /////////////////////////////

        this.totals.forEach (e => {
          this.dineroApostado += e.moneyBet 
          
          this.tganado = this.ganadas + this.tCashout
          this.tganado = this.tganado.toFixed(2);

          this.pieChartData= [this.dineroApostado,this.tganado,(this.tganado-this.dineroApostado)]
          
          this.radarChartData= [
            {data: [this.futbol.length, this.baloncesto.length, this.tenis.length, this.f1.length, this.motos.length, this.golf.length, this.eSports.length,this.galgos.length,this.caballos.length], label: 'Deportes'},
          ]
          console.log (this.radarChartData)
        })
      });
    });
  }
  gotoResult() {
    this.isDataAvailable = true;
  }
   // events
   public chartClicked(e:any):void {
     console.log(e);
   }
  
   public chartHovered(e:any):void {
     console.log(e);
   }
    
   gotoSpots(){
    this.isFalse = true;;
   }

}
