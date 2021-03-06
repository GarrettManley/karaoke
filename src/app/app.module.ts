import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewSongComponent } from './new-song/new-song.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { SongListComponent } from './song-list/song-list.component';
import { SafePipe } from './core/pipes/safe.pipe';

@NgModule({
  declarations: [AppComponent, NewSongComponent, NavBarComponent, ButtonComponent, SongListComponent, SafePipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
