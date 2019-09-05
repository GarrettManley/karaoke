import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { youtube_v3 } from 'googleapis';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  apiUrl = 'https://www.googleapis.com/youtube/v3/';
  key: string = require('../../../api-keys.json').youtube.serverKey;
  keyParam = `&key=${this.key}`;

  constructor(private http: HttpClientService) {}

  public async getVideo(url: string): Promise<youtube_v3.Schema$VideoSnippet> {
    let id = '';
    try {
      id = this.getIdFromUrl(url);
    } catch (error) {
      throw error;
    }

    return await this.http.get(this.apiUrl + `videos?part=snippet&id=${id}` + this.keyParam).then((resp: any) => {
      if (resp.items[0]) {
        return resp.items[0].snippet;
      } else {
        throw new Error('Unable to parse video ID from provided URL');
      }
    });
  }

  public getIdFromUrl(url: string): string {
    const youtubeLinkRegex = new RegExp(`^(https?\:\/\/)?(www\.)?(youtube\.com\/watch|youtu\.?be\/)`);
    let id = url.replace(youtubeLinkRegex, ``);

    // TODO:: Handle other possible params
    if (id.substr(0, 3) === '?v=') {
      id = id.substr(3);
    }

    // TODO:: Additional parsing on id values to ensure more validity before passing to the YouTube API

    return id;
  }
}
