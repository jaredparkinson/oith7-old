import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChapterComponent } from './components/chapter/chapter.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':lang/:book/:chapter', component: ChapterComponent },
  { path: ':book/:chapter', component: ChapterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
