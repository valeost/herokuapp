import { map } from 'rxjs/operators';
import { ApiService } from './../services/api-service.service';
import { City } from '../models/city';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-heroku-list',
  templateUrl: './heroku-list.component.html',
  styleUrls: ['./heroku-list.component.scss']
})
export class HerokuListComponent implements OnInit, OnDestroy {

  cities: Array<City> = new Array<City>();
  subscriptors: Array<Subscription> = new Array<Subscription>();
  constructor(private _apiService: ApiService) {

    let getListSubscription = this._apiService.getList().pipe(map(list => {
      let mappedList: Array<City> = new Array<City>();
      list.map(city => {
        mappedList.push({
          id: city.id,
          title:city.title,
          content: city.content,
          image_url: city.image_url,
          lat: city.lat,
          long: city.long
        })
      });
      return mappedList;
    })).subscribe(citiesList => {
      this.cities = citiesList;
    });
    this.subscriptors.push(getListSubscription);
    
   }

  ngOnInit() {
    console.log('CITIES LIST: ', this.cities);
  }
  ngOnDestroy(): void {
    this.subscriptors.forEach(subscriptor => {
      subscriptor.unsubscribe();
    });
  }
  drop(event: CdkDragDrop<City[]>) {
    moveItemInArray(this.cities, event.previousIndex, event.currentIndex);
  }
}
