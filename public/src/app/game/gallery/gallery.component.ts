import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  clickedImageIndex: number;
  isImageClicked = false;

  constructor(private gameService: GameService) { }

  ngOnInit() {

  }

  onImageClicked(index: number) {
    this.clickedImageIndex = index;
    this.isImageClicked = true;
  }

}
