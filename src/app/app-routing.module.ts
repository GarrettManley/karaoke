import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSongComponent } from './new-song/new-song.component';

const routes: Routes = [
  { path: 'new-song', component: NewSongComponent },
  { path: '**', redirectTo: '/new-song', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
