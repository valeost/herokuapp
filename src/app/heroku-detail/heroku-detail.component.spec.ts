import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerokuDetailComponent } from './heroku-detail.component';

describe('HerokuDetailComponent', () => {
  let component: HerokuDetailComponent;
  let fixture: ComponentFixture<HerokuDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerokuDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerokuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
