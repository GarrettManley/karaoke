import { Component, OnInit } from '@angular/core';
import { ErrorService, ErrorMessageType } from '../core/services/error.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'karaoke-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  error$: Subject<string> = new Subject<string>();
  errorType$: Subject<ErrorMessageType> = new Subject<ErrorMessageType>();

  constructor(private errorMessageService: ErrorService) {}

  ngOnInit() {
    this.errorMessageService.errorMessage$.subscribe(message => {
      this.error$.next(message);
    });

    this.errorMessageService.errorType$.subscribe(type => {
      this.errorType$.next(type);
    });
  }
}
