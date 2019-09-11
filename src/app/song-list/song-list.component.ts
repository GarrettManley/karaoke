import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { KaraokeMediator } from '../core/services/karaoke.mediator.service';
import { ISong } from '../core/models/song.interface';

@Component({
  selector: 'karaoke-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  songs$: ReplaySubject<ISong[]> = new ReplaySubject<ISong[]>();
  currentSong: ISong;

  constructor(private karaoke: KaraokeMediator, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.karaoke.songs$.subscribe(songs => {
      this.songs$.next(songs);
    });

    this.songs$.subscribe(songs => {
      this.currentSong = songs[0];
    });
  }

  clickSongPlayed() {
    this.karaoke.markSongPlayed(this.currentSong);
  }
}
