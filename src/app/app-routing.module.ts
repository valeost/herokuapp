import { HerokuDetailComponent } from './heroku-detail/heroku-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HerokuListComponent } from './heroku-list/heroku-list.component';

const routes: Routes = [
  { path: 'cities', component: HerokuListComponent },
  { path: 'city', component: HerokuDetailComponent },
  {
    path: '',
    redirectTo:'/cities',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
