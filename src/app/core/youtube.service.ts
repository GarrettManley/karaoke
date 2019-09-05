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

  public async getVideoTitle(id: string): Promise<string> {
    return await this.http.get(this.apiUrl + `videos?part=snippet&id=${id}` + this.keyParam).then((resp: any) => {
      const title = resp.items[0].snippet.title;
      return title;
    });
  }

  public async getVideo(url: string): Promise<youtube_v3.Schema$VideoSnippet> {
    const id = this.getIdFromUrl(url);

    return await this.http.get(this.apiUrl + `videos?part=snippet&id=${id}` + this.keyParam).then((resp: any) => {
      return resp.items[0].snippet;
    });
  }

  public async getVideoTitleFromUrl(url: string): Promise<string> {
    return await this.getVideoTitle(this.getIdFromUrl(url));
  }

  public getIdFromUrl(url: string): string {
    const youtubeLinkRegex = new RegExp(`^(https?\:\/\/)?(www\.)?(youtube\.com\/watch|youtu\.?be\/)`);
    let id = url.replace(youtubeLinkRegex, ``);

    // TODO:: Handle other possible params
    if (id.substr(0, 3) === '?v=') {
      id = id.substr(3);
    }

    return id;
  }
}
