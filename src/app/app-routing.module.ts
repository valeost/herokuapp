import { CityDetailComponent } from './city-detail/city-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';

const routes: Routes = [
  { path: 'cities', component: CityListComponent },
  { path: 'city/:id', component: CityDetailComponent },
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
