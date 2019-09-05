import { youtube_v3 } from 'googleapis';

export interface ISong {
  singer: string;
  songLink: string;
  video: youtube_v3.Schema$VideoSnippet;
  status: {
    completed: boolean;
  };

  markAsSkipped(): void;
}
