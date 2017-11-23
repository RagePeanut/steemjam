import { SteemConnectService } from './../steemconnect.service';
import { GameService } from './game.service';
import * as steem from 'steem';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  mainGenre: string;
  mainUser: string;
  permLink: string;

  loved = false;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private steemConnectService: SteemConnectService) { }

  ngOnInit() {
    // Extracting route parameters
    const routeSnapshot = this.route.snapshot;
    this.mainGenre = routeSnapshot.params['genre'];
    this.mainUser = routeSnapshot.params['username'].replace(/@/, '');
    this.permLink = routeSnapshot.params['game'];
    // Fetching the post object
    this.gameService
      .setGame(this.permLink)
      .then(
        () => {
          this.loved = this.gameService.game.active_votes
            .some(
              activeVote => activeVote.voter === 'nuttinghere' && activeVote.weight > 0
            );
        }
      );
  }

  onLoveClicked() {
    const alreadyLoved = this.loved ? 0 : 1;
    const weight = 10000;
    console.log(this.mainUser, this.permLink, alreadyLoved * weight);
    this.steemConnectService
      .vote(this.mainUser, this.permLink, alreadyLoved * weight)
      .catch(error => {
        // tslint:disable-next-line:max-line-length
        console.log('There was an error' + ((alreadyLoved === 1) ? ' while voting, the game may have already been upvoted. It is possible that the problem comes from your Steem Power, you may want to put your Voting Power to 100% if you don\'t have much Steem Power.' : ' while unvoting, the game may have already been unvoted.'));
      })
      .then(
        this.loved = !this.loved,
        this.gameService.game.net_votes += (this.loved ? 1 : -1)
      );
  }

}
