import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  content: string;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.content = this.gameService.controlsPart;
    this.gameService.controlsPartEmitter
      .subscribe(
        (content: string) => {
          this.content = content;
        }
      );
  }

}
