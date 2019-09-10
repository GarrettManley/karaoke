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

    this.firebase
      .database(this.songRef)
      .push(song, error => {
        if (error) {
          this.error.setErrorMessage(error.message);
        }
      })
      .then(ref => {
        song.key = ref.key;
        this.updateSong(song);
        this.router.navigate(['/song-list']);
      });
  }

  public async updateSong(song: ISong, key: string = null) {
    let songKey = key;

    if (!key) {
      if (!song.key) {
        this.error.setErrorMessage('Can not update song, value for "key" is missing');
        return;
      } else {
        songKey = song.key;
      }
    }

    this.firebase.database(this.songRef + '/' + songKey).update(song, error => {
      if (error) {
        this.error.setErrorMessage(error.message);
      }
    });
  }

  public async markSongPlayed(song: ISong) {
    console.log(
      `${KaraokeMediator.name} - ${this.markSongPlayed.name}: marking the song \"${song.video.title}\" as played`
    );

    try {
      if (song.status.completed) {
        throw new Error('Song already marked as complete');
      } else {
        song.status.completed = true;
        this.updateSong(song);
      }
    } catch (error) {
      this.error.setErrorMessage(error.message);
    }
  }

  public fetchSongs(): any {
    console.log(`${KaraokeMediator.name} - ${this.fetchSongs.name}: Fetching Songs from Firebase`);

    this.firebase.database(this.songRef).once(
      'value',
      data => {
        try {
          if (data.val()) {
            this.songs$.next(Object.values(data.val()));
            return data.val();
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
        const songs = Object.values<ISong>(data.val());
        const unplayed = songs.filter(song => !song.status.completed);
        this.songs$.next(unplayed);
      } catch {
        this.error.setErrorMessage('Error fetching newly added song', ErrorMessageType.error);
      }
    });
  }
}
