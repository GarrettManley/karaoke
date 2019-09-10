import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { ErrorMessageType, ErrorService } from './error.service';
import { FirebaseService } from './firebase.service';
import { ISong } from './models/song.interface';
import { YoutubeService } from './youtube.service';

@Injectable({
  providedIn: 'root',
})
export class KaraokeMediator {
  songs$: ReplaySubject<ISong[]> = new ReplaySubject<ISong[]>();

  karaokeRef = 'karaoke';
  songRef = this.karaokeRef + '/songs';

  constructor(
    private firebase: FirebaseService,
    private error: ErrorService,
    private youtube: YoutubeService,
    private router: Router
  ) {
    console.log('/-------------------------\\\n Starting Karaoke Fun Time \n\\-------------------------/');
    this.fetchSongs();
    this.subscribeToSongs();
  }

  public async addSong(song: ISong) {
    try {
      song.video = await this.youtube.getVideo(song.songLink);
      song.embedLink = this.youtube.getEmbedFromUrl(song.songLink);
    } catch (error) {
      this.error.setErrorMessage(error.message);
      return;
    }

    this.firebase.database(this.songRef).push(song, error => {
      if (error) {
        this.error.setErrorMessage(error.message);
      } else {
        this.router.navigate(['/song-list']);
      }
    });
  }

  public async fetchSongs() {
    await this.firebase.database(this.songRef).once(
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
