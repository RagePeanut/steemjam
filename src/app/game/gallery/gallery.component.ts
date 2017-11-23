import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  gallery: string[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gallery = this.gameService.gallery;
    this.gameService.galleryEmitter
      .subscribe(
        (images: string[]) => {
          this.gallery = images;
        }
      );
  }

}
