import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  projectID = 'garrettmanley-website';
  firebaseConfig = {
    apiKey: 'AIzaSyA5TeFeWR-KT_Y2KUggM0ECiMErzjz4HuM',
    authDomain: this.projectID + '.firebaseapp.com',
    databaseURL: 'https://' + this.projectID + '.firebaseio.com',
    projectId: this.projectID,
  };

  app = firebase.initializeApp(this.firebaseConfig);

  constructor() {
    this.getSongs();
  }

  public getSongs() {
    this.app
      .database()
      .ref('karaoke/songs')
      .on('child_changed', data => {
        console.log(data.val());
      });
  }
}
