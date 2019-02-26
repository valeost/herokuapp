import { PositionModel } from './../models/position.model';
import { map, switchMap, filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { City } from './../models/city';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../core/api/api-service.service';
import { Router, Navigation } from '@angular/router';

@Component({
  selector: 'app-heroku-detail',
  templateUrl: './heroku-detail.component.html',
  styleUrls: ['./heroku-detail.component.scss']
})
export class HerokuDetailComponent implements OnInit, OnDestroy {
  
  subscriptors: Array<Subscription> = new Array<Subscription>();
  city: City;
  id: number;
  navigation: Navigation;
  subscrbtion: Subscription;
  positionCity: PositionModel;
  private state$: Observable<string>;
  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) { 
    this.navigation = this._router.getCurrentNavigation();
  }

  ngOnInit() {
    
    this.id = this.navigation.extras.state ? this.navigation.extras.state.id : 0;
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscrbtion.unsubscribe();
  }
  loadData() {
    this.subscrbtion = this._apiService.showCity(this.id).pipe(map(city => {
      let lat = parseFloat(city.lat.toString());
      let long = parseFloat(city.long.toString());
      return {
        id: city.id,
        title: city.title,
        content: city.content,
        image_url: city.image_url,
        lat: lat,
        long: long
      };

    })).subscribe(mappedCity => {
      this.city = mappedCity;
      this.positionCity = {
        lat: this.city.lat,
        long: this.city.long
      }
    });
  }
  updateCityDetail(city: City) {
    let cityId = city.id;
    this._router.navigateByUrl('/city', { state: { id: cityId } });
  }
}
