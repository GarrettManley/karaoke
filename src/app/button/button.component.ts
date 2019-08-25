import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'karaoke-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, AfterViewInit {
  @Input()
  title = 'New Button';

  @ViewChild('btn', { read: ElementRef, static: false }) btn: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    (this.btn.nativeElement as HTMLElement).addEventListener(
      'focus',
      () => {
        (document.activeElement as HTMLElement).blur();
      },
      true
    );
  }
}
