import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { KaraokeMediator } from '../core/karaoke.mediator.service';
import { ISong } from '../core/models/song.interface';

@Component({
  selector: 'karaoke-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  songs$: ReplaySubject<ISong[]> = new ReplaySubject<ISong[]>();

  constructor(private karaoke: KaraokeMediator, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('Song list initialized');
    this.karaoke.songs$.subscribe(data => {
      this.songs$.next(data);
    });
  }
}
