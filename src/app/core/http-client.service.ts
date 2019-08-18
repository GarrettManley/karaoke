import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  public async post(url: string, content: any) {
    return await this.http
      .post(url, content)
      .toPromise()
      .then(resp => {
        return resp;
      })
      .catch(error => {
        throw error;
      });
  }

  public async get(url: string) {
    return await this.http
      .get(url)
      .toPromise()
      .then(resp => {
        return resp;
      })
      .catch(error => {
        throw error;
      });
  }

  public async put(url: string, content: any) {
    return await this.http
      .put(url, content)
      .toPromise()
      .then(resp => {
        return resp;
      })
      .catch(error => {
        throw error;
      });
  }
  public async delete(url: string) {
    return await this.http
      .delete(url)
      .toPromise()
      .then(resp => {
        return resp;
      })
      .catch(error => {
        throw error;
      });
  }
}
