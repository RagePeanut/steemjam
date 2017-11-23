import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  content: string;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.content = this.gameService.aboutPart;
    this.gameService.aboutPartEmitter
    .subscribe(
      (content: string) => {
        this.content = content;
      }
    );
  }

}
