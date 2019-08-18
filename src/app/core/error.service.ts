import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public errorMessage$: Subject<string> = new Subject<string>();

  constructor() {}

  public setErrorMessage(message: string) {
    this.errorMessage$.next(message);
  }
}
