import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'karaoke-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss'],
})
export class NewSongComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  addNewSongClicked() {
    console.log(`Clicked`);
  }
}
