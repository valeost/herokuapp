import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerokuListComponent } from './heroku-list.component';

describe('HerokuListComponent', () => {
  let component: HerokuListComponent;
  let fixture: ComponentFixture<HerokuListComponent>;
  let fakeList = [{
    "id": 1,
    "title": "Madrid",
    "content": "Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.",
    "lat": "40.41678",
    "long": "-3.70379",
    "image_url": "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg",
    "created_at": "2019-01-22T16:22:46.037Z",
    "updated_at": "2019-01-22T16:22:46.037Z"
  },
  {
    "id": 2,
    "title": "Barcelona",
    "content": "Barcelona is the capital and largest city of Catalonia with a population of 1.6 million within city limits.",
    "lat": "41.3851",
    "long": "2.1734",
    "image_url": "https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2017/05/17/15/barcelona-skyline.jpg",
    "created_at": "2019-01-22T16:22:46.043Z",
    "updated_at": "2019-01-22T16:22:46.043Z"
  },
  {
    "id": 3,
    "title": "Berlin",
    "content": "Berlin is the capital and the largest city of Germany as well as one of its 16 constituent states. With a population of approximately 3.7 million, Berlin is the second...",
    "lat": "52.5065133",
    "long": "13.1445548",
    "image_url": "https://lonelyplanetwp.imgix.net/2015/12/brandenburg-gate-berlin-GettyRF-1500-cs.jpg",
    "created_at": "2019-01-22T16:22:46.051Z",
    "updated_at": "2019-01-22T16:22:46.051Z"
  }]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HerokuListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerokuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be load 3 element of list', () => {
    component.cities = fakeList;
    expect(component.cities.length).toBe(3);
  });
});
