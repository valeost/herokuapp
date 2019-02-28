
import { MatDialog, MatDialogRef, MatDialogTitle, MatSnackBar } from '@angular/material';
import { PositionModel } from './../models/position.model';
import { map, switchMap, filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { City } from './../models/city';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { Router, Navigation, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { CityToolbarService } from '../services/city-toolbar.service';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';


@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit, OnDestroy {
  city: City;
  id: number;
  navigation: Navigation;
  subscrbtions: Subscription[] = [];
  positionCity: PositionModel;
  dialogRef: MatDialogRef<CityDialogComponent>;
  constructor(
    private _apiService: ApiService,
    private _router: ActivatedRoute,
    public dialog: MatDialog,
    private _toolbarService: CityToolbarService,
    private _location: Location,
    private _snackBar: MatSnackBar
  ) {
    this.id = +this._router.snapshot.paramMap.get('id');
    this._toolbarService.config({
      label: 'keyboard_return',
      title: 'Information'
    });
    this.subscrbtions.push(this._toolbarService._action$.subscribe(() => {
      this._location.back();
    }));
  }

  ngOnInit() {
    this.loadData();

  }
  ngOnDestroy(): void {
    this.subscrbtions.forEach(sub => {
      sub.unsubscribe()
    });
  }
  loadData() {
    this.subscrbtions.push(this._apiService.showCity(this.id).pipe(map(city => {
      debugger;
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
    },
    err => {
      this.openSnackBar(err, 'Close');
    }
  ));
  }
  updateCityDetail() {
    this.openDialog();

  }
  openDialog() {;
    this.dialogRef = this.dialog.open(CityDialogComponent, {
      width: '40rem',
      data: { city: this.city, title: "Update Data"},
      
    });
    this.afterCloseDialog();
  }
  afterCloseDialog() {
    let subs = this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.city = result.data;
      if(result.action) {
        this.uploadData();
      }
      

    });
    this.subscrbtions.push(subs);
  }
  uploadData() {
    this.subscrbtions.push(this._apiService.updateCity(this.id, this.city).pipe(map(city => {
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
    },
    err => {
      this.openSnackBar(err, 'Close');
    }
  ));
  }
  openSnackBar(message: string, action: string) {
    debugger;
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  };
}
