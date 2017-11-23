import { MarkdownParserService } from './../../markdown-parser.service';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {

  }

}
