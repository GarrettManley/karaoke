import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { KaraokeMediator } from '../core/karaoke.mediator.service';
import { ISong } from '../core/models/song.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'karaoke-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  songs$: Observable<ISong[]>;

  constructor(private karaoke: KaraokeMediator) {}

  ngOnInit() {
    this.songs$ = this.karaoke.songs$;
  }
}
