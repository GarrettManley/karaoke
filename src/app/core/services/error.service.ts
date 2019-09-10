import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ErrorMessageType {
  error = 'error',
  warning = 'warning',
  info = 'info',
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public errorMessage$: Subject<string> = new Subject<string>();
  public errorType$: Subject<ErrorMessageType> = new Subject<ErrorMessageType>();

  constructor() {}

  public setErrorMessage(message: string, errorType: ErrorMessageType = ErrorMessageType.error) {
    this.errorType$.next(errorType);
    this.errorMessage$.next(message);
  }

  public clearErrorMessage() {
    this.errorMessage$.next('');
    this.errorType$.next(ErrorMessageType.error);
  }
}
