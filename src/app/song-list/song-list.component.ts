import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { KaraokeMediator } from '../core/karaoke.mediator.service';
import { ISong } from '../core/models/song.interface';

@Component({
  selector: 'karaoke-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  songs$: ReplaySubject<ISong[]> = new ReplaySubject<ISong[]>();
  currentSong$: Subject<ISong> = new Subject<ISong>();
  currentSongEmbedLink$: Subject<string> = new Subject<string>();

  constructor(private karaoke: KaraokeMediator, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.karaoke.songs$.subscribe(songs => {
      this.songs$.next(songs);
    });

    this.songs$.subscribe(songs => {
      this.currentSong$.next(songs[0]);
    });

    this.currentSong$.subscribe(song => {
      this.currentSongEmbedLink$.next(song.embedLink);
    });
  }
}
