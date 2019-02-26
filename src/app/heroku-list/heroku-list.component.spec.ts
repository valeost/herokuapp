import { AppModule } from './../app.module';
import { Observable, of, defer } from 'rxjs';
import { ApiService } from '../core/api/api-service.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { HerokuListComponent } from './heroku-list.component';
import { HttpClientTestingModule }  from '@angular/common/http/testing';
describe('HerokuListComponent', () => {
  let component: HerokuListComponent;
  let fixture: ComponentFixture<HerokuListComponent>;
  let testList = [
    {
      id: 1,
      title: "Madrid",
      content: "Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.",
      lat: 40.41678,
      long: -3.70379,
      image_url: "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg"
    },
    {
      id: 2,
      title: "Barcelona",
      content: "Barcelona is the capital and largest city of Catalonia with a population of 1.6 million within city limits.",
      lat: 41.3851,
      long: 2.1734,
      image_url: "https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2017/05/17/15/barcelona-skyline.jpg"
    },
    {
      id: 3,
      title: "Berlin",
      content: "Berlin is the capital and the largest city of Germany as well as one of its 16 constituent states. With a population of approximately 3.7 million, Berlin is the second...",
      lat: 52.5065133,
      long: 13.1445548,
      image_url: "https://lonelyplanetwp.imgix.net/2015/12/brandenburg-gate-berlin-GettyRF-1500-cs.jpg"
    }
  ]

  let apiService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        AppModule, HttpClientTestingModule
      ],
    })
      .compileComponents();
      
  }));

  beforeEach(inject([ApiService], s => {
    apiService = s;
    fixture = TestBed.createComponent(HerokuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getList called should be called', async(() => {
    spyOn(apiService, 'getList').and.returnValue(of(testList));
    component.loadData();
    fixture.detectChanges();
    expect(component.cities).toEqual(testList);
  }));
  

});
