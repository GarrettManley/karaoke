import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ISong } from './models/song.interface';
import { FirebaseService } from './firebase.service';
import { ErrorService, ErrorMessageType } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class KaraokeMediator {
  songs$: Subject<ISong[]> = new Subject<ISong[]>();

  karaokeRef = 'karaoke';
  songRef = this.karaokeRef + '/songs';

  constructor(private firebase: FirebaseService, private error: ErrorService) {
    console.log('/-------------------------\\\n Starting Karaoke Fun Time \n\\-------------------------/');
    this.subscribeToSongs();
  }

  public addSong(song: ISong) {
    this.firebase.database(this.songRef).push(song, error => {
      if (error) {
        this.error.setErrorMessage(error.message);
      }
    });
  }

  private subscribeToSongs() {
    this.firebase.database(this.songRef).on('value', data => {
      try {
        this.songs$.next(Object.values(data.val()));
        console.log(Object.values(data.val()));
        this.error.setErrorMessage('Get ready to SING!', ErrorMessageType.info);
      } catch {
        // tslint:disable-next-line: quotemark
        this.error.setErrorMessage('Enter a song...', ErrorMessageType.error);
      }
    });
  }
}
