import { HerokuMapComponent } from './../heroku-map/heroku-map.component';
import { PositionModel } from './../models/position.model';

import { map } from 'rxjs/operators';
import { ApiService } from '../core/api/api-service.service';
import { City } from '../models/city';
import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-heroku-list',
  templateUrl: './heroku-list.component.html',
  styleUrls: ['./heroku-list.component.scss']
})
export class HerokuListComponent implements OnInit, OnDestroy {

  cities: City[]= [];
  subscriptors: Array<Subscription> = new Array<Subscription>();
  positionCity: PositionModel;
  @ViewChild(HerokuMapComponent)
  public mapComponent: HerokuMapComponent;
  constructor(private _apiService: ApiService, private _router: Router) {

    this.loadData();
    
   }

  ngOnInit() {
    console.log('CITIES LIST: ', this.cities);
    this.positionCity = {
      lat: 41.385063,
      long: 2.173404
    }
  }
  loadData() {
    let getListSubscription = this._apiService.getList().pipe(map(list => {
      let mappedList: Array<City> = new Array<City>();
      list.map(city => {
        let lat = parseFloat(city.lat.toString());
        let long = parseFloat(city.long.toString());
        mappedList.push({
          id: city.id,
          title:city.title,
          content: city.content,
          image_url: city.image_url,
          lat: lat,
          long: long
        })
      });
      return mappedList;
    })).subscribe(citiesList => {
      this.cities = citiesList;
    });
    this.subscriptors.push(getListSubscription);
  }
  ngOnDestroy(): void {
    this.subscriptors.forEach(subscriptor => {
      subscriptor.unsubscribe();
    });
  }
  drop(event: CdkDragDrop<City[]>) {
    moveItemInArray(this.cities, event.previousIndex, event.currentIndex);
  }
  showCityDetail(city: City) {
    let cityId = city.id;
    this._router.navigateByUrl('/city', { state: { id: cityId } });
  }

  flyToCity(city: City) {
    let position = {
      lat: city.lat,
      long: city.long
    }
    this.mapComponent.flyTo(position, function() {});
  }
}
