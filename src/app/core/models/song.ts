import { ISong } from './song.interface';
import { youtube_v3 } from 'googleapis';

export class Song implements ISong {
  video: youtube_v3.Schema$VideoSnippet;
  singer = '';
  songLink = 'https://www.youtube.com';
  status = { completed: false };

  constructor(name: string, link: string) {
    this.singer = name;
    this.songLink = link;
  }

  public markAsSkipped() {}
}
