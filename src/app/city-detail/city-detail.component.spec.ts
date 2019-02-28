import { of } from 'rxjs';
import { ApiService } from '../services/api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from './../app.module';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CityDetailComponent } from './city-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog, MatDialogModule,  } from '@angular/material';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';


describe('CityDetailComponent', () => {
  let component: CityDetailComponent;
  let fixture: ComponentFixture<CityDetailComponent>;
  let spaApiService;
  let router: Router;
  let dialogSpy: MatDialog;
  let dialogRef: MatDialogRef<CityDialogComponent>;
  let dialogTest: MatDialog;
  let htmlElement: HTMLElement;
  let testCity = {
    id: 1,
    title: "Madrid",
    content: "Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.",
    lat: 40.41678,
    long: -3.70379,
    image_url: "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg"
  };
  let newTestCity = {
    id: 1,
    title: "Madrid2",
    content: "Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.",
    lat: 40.41678,
    long: -3.70379,
    image_url: "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg"
  };
  let mockState = { state: { id: 1 } };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule, HttpClientTestingModule,
       RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: OverlayContainer, useFactory: () => {
          htmlElement = document.createElement('div');
          return { getContainerElement: () => htmlElement };
        }}
      ]
    })
    .compileComponents();
    router = TestBed.get(Router);
    dialogTest = TestBed.get(MatDialog);
  }));

  beforeEach(inject([ApiService], s => {
    spaApiService = s;
    fixture = TestBed.createComponent(CityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should load data', async(() => {
    spyOn(spaApiService, 'showCity').and.returnValue(of(testCity));
    
    component.loadData();
    fixture.detectChanges();
    expect(component.city).toEqual(testCity);
  }));
  it('should update data', async(() => {
    spyOn(spaApiService, 'updateCity').and.returnValue(of(newTestCity));
    
    component.uploadData();
    fixture.detectChanges();
    expect(component.city).toEqual(newTestCity);
  }));
  it('should be bind data', () => {
    const config = {
      data: { city: testCity, title: "Update Data"}
    };
    dialogTest.open(CityDialogComponent, config);
    fixture.detectChanges();
    const title = htmlElement.querySelector('#mat-dialog-title-0');

    expect(title.textContent).toBe('UPDATE DATA');

  });

});
