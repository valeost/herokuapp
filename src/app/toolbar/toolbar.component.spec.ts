import { AppModule } from './../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityToolbarComponent } from './toolbar.component';

describe('cityToolbarComponent', () => {
  let component: CityToolbarComponent;
  let fixture: ComponentFixture<CityToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
