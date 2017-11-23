import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.css']
})
export class EditGalleryComponent implements OnInit {

  gallery = [];
  text = '';

  constructor() { }

  ngOnInit() {
  }

  addImage() {
    if (/^[^ ]+\.(?:(?:jpe?|pn)g|gif)$/.test(this.text)) {
      this.gallery.push(this.text);
    }
  }

}
