import { ProfileService } from './../profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['../games/games.component.css']
})
export class LikedComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit() {

  }

}
