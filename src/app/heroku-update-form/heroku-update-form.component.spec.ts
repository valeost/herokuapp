import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerokuUpdateFormComponent } from './heroku-update-form.component';

describe('HerokuUpdateFormComponent', () => {
  let component: HerokuUpdateFormComponent;
  let fixture: ComponentFixture<HerokuUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerokuUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerokuUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
