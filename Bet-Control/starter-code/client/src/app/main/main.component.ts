import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SessionService } from "../services/session.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public sessionService: SessionService) { }

  ngOnInit() {
  }

}
