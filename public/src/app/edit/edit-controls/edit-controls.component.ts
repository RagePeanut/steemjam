import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-controls',
  templateUrl: './edit-controls.component.html',
  styleUrls: ['./edit-controls.component.css']
})
export class EditControlsComponent implements OnInit {

  controls = [];
  action = '';
  keyboard = '';
  gamepad = '';

  constructor() { }

  ngOnInit() {
  }

  onBindingsAdded() {
    if (this.action === '') {
      return;
    }
    if (this.keyboard === '') {
      if (this.gamepad === '') {
        return;
      }
      this.keyboard = 'Not supported';
    } else if (this.gamepad === '') {
      this.gamepad = 'Not supported';
    }
    this.controls.push(
      {
        action: this.action,
        keyboard: this.keyboard,
        gamepad: this.gamepad
      }
    );
    this.action = '';
    this.keyboard = '';
    this.gamepad = '';
  }

}
