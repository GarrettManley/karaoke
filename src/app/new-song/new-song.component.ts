import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { KaraokeMediator } from '../core/karaoke.mediator.service';
import { FormControl } from '@angular/forms';
import { ErrorService, ErrorMessageType } from '../core/error.service';
import { Song } from '../core/models/song';

@Component({
  selector: 'karaoke-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss'],
})
export class NewSongComponent implements OnInit, AfterViewInit {
  @ViewChild('singer', { read: ElementRef, static: false }) singerElement: ElementRef;
  singerControl = new FormControl('Your Name');

  song: Song;
  songControl = new FormControl('https://youtu.be/');
  youtubeLinkRegex: RegExp = new RegExp(`^(https?\:\/\/)?(www\.)?(youtube\.com\/watch|youtu\.?be\/).+$`);

  constructor(private karaoke: KaraokeMediator, private error: ErrorService) {}

  ngOnInit() {
    this.song = new Song(this.singerControl.value, this.songControl.value);
  }

  ngAfterViewInit() {
    (this.singerElement.nativeElement as HTMLElement).addEventListener(
      'focus',
      () => {
        if (!this.singerControl.dirty) {
          this.singerControl.setValue(undefined);
          this.singerControl.markAsPristine();
        }
      },
      true
    );

    (this.singerElement.nativeElement as HTMLElement).addEventListener(
      'blur',
      () => {
        if (!this.singerControl.dirty) {
          this.singerControl.setValue('Your Name');
          this.singerControl.markAsPristine();
        }
      },
      true
    );
  }

  addNewSongClicked() {
    if (this.singerControl.dirty) {
      this.song.singer = this.singerControl.value;
      this.error.clearErrorMessage();
    } else {
      this.error.setErrorMessage('Please enter your name.', ErrorMessageType.warning);
      return;
    }

    if (this.songControl.dirty && (this.songControl.value as string).match(this.youtubeLinkRegex)) {
      this.song.songLink = this.songControl.value;
      this.error.clearErrorMessage();
    } else {
      this.error.setErrorMessage('Please enter a YouTube embed link.', ErrorMessageType.warning);
      return;
    }

    this.karaoke.addSong(this.song);
  }
}
