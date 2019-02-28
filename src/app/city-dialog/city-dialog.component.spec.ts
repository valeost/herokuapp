import { City } from './../models/city';
import { AppModule } from './../app.module';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDialogComponent } from './city-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

describe('CityDialogComponent', () => {
  let component: CityDialogComponent;
  let fixture: ComponentFixture<CityDialogComponent>;
  let dialogTest: MatDialog;
  let fb: FormBuilder;
  const dialogMock = {
    close: () => { }
};

  let data = {
    city: {
      title: "Madrid",
      content: "Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.",
      lat: 40.41678,
      long: -3.70379,
      image_url: "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg",
    }, title: 'UPDATE DATA'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
      .compileComponents();
    fb = TestBed.get(FormBuilder);
    dialogTest = TestBed.get(MatDialog);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('title should be required', () => {
    component.form.controls['title'].setValue(null);
    let title = component.form.controls['title'];
    expect(title.valid).toBeFalsy();
  });
  it('content should be required', () => {
    component.form.controls['content'].setValue(null);
    let content = component.form.controls['content'];
    expect(content.valid).toBeFalsy();
  });
  it('lat should be required', () => {
    component.form.controls['lat'].setValue(null);
    let lat = component.form.controls['lat'];
    expect(lat.valid).toBeFalsy();
  });
  it('long should be required', () => {
    component.form.controls['long'].setValue(null);
    let long = component.form.controls['long'];
    expect(long.valid).toBeFalsy();
  });
  it('image_url should be required', () => {
    component.form.controls['image_url'].setValue(null);
    let image_url = component.form.controls['image_url'];
    expect(image_url.valid).toBeFalsy();
  });
  it('submitting a form emits a city', () => {
    component.form.controls['title'].setValue(data.city.title);
    component.form.controls['content'].setValue(data.city.content);
    component.form.controls['lat'].setValue(data.city.lat);
    component.form.controls['long'].setValue(data.city.long);
    component.form.controls['image_url'].setValue(data.city.image_url);
    expect(component.form.valid).toBeTruthy();
    component.dialogRef.close({data: data.city, action: true});
    let cityTest: City = data.city;
    component.onSubmit();
    
    fixture.detectChanges();
    expect(cityTest.title).toBe(data.city.title);
    expect(cityTest.content).toBe(data.city.content);
  });
});
