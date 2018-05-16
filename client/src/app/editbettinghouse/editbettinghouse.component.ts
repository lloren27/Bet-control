import { Component, OnInit } from '@angular/core';
import { BettinghousesService } from '../services/bettinghouses.service';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-editbettinghouse',
  templateUrl: './editbettinghouse.component.html',
  styleUrls: ['./editbettinghouse.component.css']
})
export class EditbettinghouseComponent implements OnInit {

  constructor(public Betting: BettinghousesService, public router: Router, public route: ActivatedRoute) { }
  bank:number;
  id:any;
  newincome:number;
  ngOnInit() {
    this.route.params.subscribe(params => {
     this.id= params.id;
      });

    this.Betting.getBettingHouses(this.id).subscribe(e => console.log(e))
  }

  newMoneyincome() {
    this.Betting.editBettingHouse(this.newincome, this.id).subscribe(() => this.router.navigate(['/profile']));
  }
}
