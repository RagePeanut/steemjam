import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class GameCommentsComponent implements OnInit {

  game: Object;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.game = this.gameService.game;
  }

}
