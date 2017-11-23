import { GameService } from './game.service';
import { PostsService } from './../home/posts.service';
import * as steem from 'steem';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  post = {
    meta: {
      image: [],
      users: []
    }
  };
  comments = [];

  mainGenre: string;
  mainUser: string;
  permLink: string;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private gameService: GameService) { }

  ngOnInit() {
    // Extracting route parameters
    const routeSnapshot = this.route.snapshot;
    this.mainGenre = routeSnapshot.params['genre'];
    this.mainUser = routeSnapshot.params['username'].replace(/@/, '');
    this.permLink = routeSnapshot.params['game'];
    // Fetching the post object
    this.postsService
      .getPost(this.mainUser, this.permLink)
      .then(
        (result) => {
          this.post = result;
          console.log(result.meta);
          this.gameService.setPart('about', result.body);
          this.gameService.setPart('controls', result.body);
          this.gameService.setGallery(result.meta.image);
        }
      );
  }

}
