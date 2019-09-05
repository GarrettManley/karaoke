import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ISong } from './models/song.interface';
import { FirebaseService } from './firebase.service';
import { ErrorService, ErrorMessageType } from './error.service';
import { YoutubeService } from './youtube.service';

@Injectable({
  providedIn: 'root',
})
export class KaraokeMediator {
  songs$: Subject<ISong[]> = new Subject<ISong[]>();

  karaokeRef = 'karaoke';
  songRef = this.karaokeRef + '/songs';

  constructor(private firebase: FirebaseService, private error: ErrorService, private youtube: YoutubeService) {
    console.log('/-------------------------\\\n Starting Karaoke Fun Time \n\\-------------------------/');
    this.fetchSongs();
    this.subscribeToSongs();
  }

  public async addSong(song: ISong) {
    song.video = await this.youtube.getVideo(song.songLink);

    this.firebase.database(this.songRef).push(song, error => {
      if (error) {
        this.error.setErrorMessage(error.message);
      }
    });
  }

  public fetchSongs() {
    this.firebase.database(this.songRef).once(
      'value',
      data => {
        try {
          if (data.val()) {
            this.songs$.next(Object.values(data.val()));
          }
        } catch (error) {
          this.error.setErrorMessage(error.message);
        }
      },
      error => {
        this.error.setErrorMessage(error.message);
      }
    );
  }

  private subscribeToSongs() {
    this.firebase.database(this.songRef).on('value', data => {
      try {
        this.songs$.next(Object.values(data.val()));
      } catch {
        this.error.setErrorMessage('Error fetching newly added song', ErrorMessageType.error);
      }
    });
  }
}
