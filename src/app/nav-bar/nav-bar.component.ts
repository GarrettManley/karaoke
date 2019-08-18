import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../core/error.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'karaoke-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  error$: Subject<string> = new Subject<string>();

  constructor(private errorMessageService: ErrorService) {}

  ngOnInit() {
    this.errorMessageService.errorMessage$.subscribe(next => {
      this.error$.next(next);
    });
  }
}
