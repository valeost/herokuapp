import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerokuMapComponent } from './heroku-map.component';

describe('HerokuMapComponent', () => {
  let component: HerokuMapComponent;
  let fixture: ComponentFixture<HerokuMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerokuMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerokuMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
