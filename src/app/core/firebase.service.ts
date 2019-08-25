import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

type Reference = firebase.database.Reference;
type App = firebase.app.App;

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  projectID = 'garrettmanley-website';

  firebaseConfig = {
    authDomain: this.projectID + '.firebaseapp.com',
    databaseURL: 'https://' + this.projectID + '.firebaseio.com',
    projectId: this.projectID,
  };

  private app: App;

  constructor() {
    this.app = firebase.initializeApp(this.firebaseConfig);
  }

  database(ref: string): Reference {
    return this.app.database().ref(ref);
  }
}
