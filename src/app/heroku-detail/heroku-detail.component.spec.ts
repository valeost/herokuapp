import { of } from 'rxjs';
import { ApiService } from '../core/api/api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from './../app.module';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HerokuDetailComponent } from './heroku-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('HerokuDetailComponent', () => {
  let component: HerokuDetailComponent;
  let fixture: ComponentFixture<HerokuDetailComponent>;
  let spaApiService;
  let router: Router;
  let navigationSpy;
  let testCity =     {
    id: 1,
    title: "Madrid",
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
      ]
    })
    .compileComponents();
    router = TestBed.get(Router);

  }));

  beforeEach(inject([ApiService], s => {
    spaApiService = s;
    fixture = TestBed.createComponent(HerokuDetailComponent);
    component = fixture.componentInstance;
    router.navigateByUrl(
      '', mockState
    );
    component.navigation = router.getCurrentNavigation();

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
});
