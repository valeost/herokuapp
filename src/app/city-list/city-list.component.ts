

import { PositionModel } from './../models/position.model';

import { map } from 'rxjs/operators';
import { ApiService } from '../services/api-service.service';
import { City } from '../models/city';
import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { ToolbarOtions } from '../models/toolbar-options.model';
import { CityDetailComponent } from '../city-detail/city-detail.component';
import { CityMapComponent } from '../city-map/city-map.component';
import { CityToolbarService } from '../services/city-toolbar.service';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';





@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit, OnDestroy {

  cities: City[] = [];
  subscriptors: Array<Subscription> = new Array<Subscription>();
  positionCity: PositionModel;
  dialogRef: MatDialogRef<CityDialogComponent>;
  @ViewChild(CityMapComponent)
  public mapComponent: CityMapComponent;
  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _toolbarService: CityToolbarService,
    public dialog: MatDialog,

  ) {

    this._toolbarService.config({
      label: 'library_add',
      title: 'Cities'
    });
    let subscr = this._toolbarService._action$.subscribe(() => {
      this.openDialog();
    });
    this.subscriptors.push(subscr);
  }

  ngOnInit() {
    this.loadData();
    console.log('CITIES LIST: ', this.cities);
    this.positionCity = {
      lat: 41.385063,
      long: 2.173404
    }
  };

  loadData() {
    let getListSubscription = this._apiService.getList().pipe(map(list => {
      let mappedList: Array<City> = new Array<City>();
      list.map(city => {
        let lat = parseFloat(city.lat.toString());
        let long = parseFloat(city.long.toString());
        mappedList.push({
          id: city.id,
          title: city.title,
          content: city.content,
          image_url: city.image_url,
          lat: lat,
          long: long
        })
      });
      return mappedList;
    })).subscribe(citiesList => {
      this.cities = citiesList;
    },
      err => {
        this.openSnackBar(err, 'Close');
      }
    );
    this.subscriptors.push(getListSubscription);
  }
  ngOnDestroy(): void {
    this.subscriptors.forEach(subscriptor => {
      subscriptor.unsubscribe();
    });
  }
  showCityDetail(city: City) {
    let cityId = city.id;
    this._router.navigate(['/city', cityId]);
  }

  flyToCity(city: City) {
    let position = {
      lat: city.lat,
      long: city.long
    }
    this.mapComponent.flyTo(position, function () { });
  }
  openSnackBar(message: string, action: string) {
    debugger;
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  };
  openDialog() {
    ;
    this.dialogRef = this.dialog.open(CityDialogComponent, {
      width: '40rem',
      data: { title: "Create Data" },

    });
    this.afterCloseDialog();
  };
  afterCloseDialog() {
    let subscription = this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result.action) {
        this.addCity(result.data);
      }
      
    });
    this.subscriptors.push(subscription);
  }
  addCity(newCity: City) {
    let subscription = this._apiService.createCity(newCity).subscribe(
      city => {
        this.cities.push(city)
      },
      err => {
        this.openSnackBar(err, 'Close');
      }
    );
    this.subscriptors.push(subscription);
  }
  removeCity(cityToDelete: City) {
    let subscription = this._apiService.deleteCity(cityToDelete.id).subscribe(() => {
      this.loadData()
    },
      err => {
        this.openSnackBar(err, 'Close');
      }

    );
    this.subscriptors.push(subscription);
  }
}
