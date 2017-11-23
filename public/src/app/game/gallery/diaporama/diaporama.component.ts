import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-diaporama',
  templateUrl: './diaporama.component.html',
  styleUrls: ['./diaporama.component.css']
})
export class DiaporamaComponent implements OnInit {

  @Input() gallery = [];
  @Input() clickedImageIndex;
  @Output() isClosed = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.isClosed.emit(true);
  }

  onSwitchImage(direction: number) {
    this.clickedImageIndex += direction;
    if (this.clickedImageIndex <= -1) {
      this.clickedImageIndex = this.gallery.length - 1;
    } else if (this.clickedImageIndex === this.gallery.length) {
      this.clickedImageIndex = 0;
    }
    console.log(this.clickedImageIndex);
  }

}
