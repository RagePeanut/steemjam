import { UserService } from './user.service';
import { User } from './user.model';
import { Component, OnInit } from '@angular/core';

import * as sc2 from 'sc2-sdk';
import * as steem from 'steem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  triggerClicked = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    steem.api.setWebSocket('wss://steemd.steemit.com');
    this.userService.setUser(
      new User(false, -1, '', 'ragepeanut', 0)
    );
    console.log(this.userService.getUser());

    sc2.init({
      app: 'steemjam.app',
      callbackURL: 'http://localhost:4200/redirect',
      scope: ['like', 'comment']
    });

    console.log(sc2.getLoginURL());
  }

  onTriggerClicked() {
    this.triggerClicked = !this.triggerClicked;
  }

}
