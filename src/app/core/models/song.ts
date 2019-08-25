import { ISong } from './song.interface';

export class Song implements ISong {
  singer = '';
  songLink = 'https://www.youtube.com';
  status = { completed: false };

  constructor(name: string, link: string) {
    this.singer = name;
    this.songLink = link;
  }

  public markAsSkipped() {}
}
