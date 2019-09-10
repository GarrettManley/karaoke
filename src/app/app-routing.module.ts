import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSongComponent } from './new-song/new-song.component';
import { SongListComponent } from './song-list/song-list.component';

const routes: Routes = [
  { path: 'new-song', component: NewSongComponent },
  { path: 'song-list', component: SongListComponent },
  { path: '**', redirectTo: '/new-song', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
