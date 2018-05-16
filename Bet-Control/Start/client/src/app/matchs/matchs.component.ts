import { Component, OnInit } from '@angular/core';
import { MatchService } from "../services/match.service";

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.css']
})
export class MatchsComponent implements OnInit {
  matchs:any;

  constructor(public Match: MatchService) { }

  ngOnInit() {

    this.Match.getfixtures().subscribe(matchs => {
      this.matchs = matchs; 
      console.log (matchs)
      });
    
  }

}
