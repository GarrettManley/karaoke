import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../core/http-client.service';
import { ErrorService } from '../core/error.service';
import { FirebaseService } from '../core/firebase.service';

@Component({
  selector: 'karaoke-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss'],
})
export class NewSongComponent implements OnInit {
  constructor(private httpClient: HttpClientService, private errors: ErrorService, private firebase: FirebaseService) {}

  ngOnInit() {}

  async addNewSongClicked() {
    await this.firebase.getSongs();
    // await this.httpClient
    //   .post('https://garrettmanley-website.firebaseio.com/karaoke/songs.json', { test: 'test' })
    //   .catch(error => {
    //     this.errors.setErrorMessage(`${error.status}: ${error.statusText}`);
    //   });
  }
}
