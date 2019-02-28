
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { City } from './../models/city';
import { Component, OnInit, Inject, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.scss']
})
export class CityDialogComponent implements OnInit {
  form: FormGroup;
  @Output() onSubmitEmitter = new EventEmitter<City>();
  city: City;
  constructor(
    public dialogRef: MatDialogRef<CityDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: City) {
     this.city = this.data['city'];
     dialogRef.disableClose = true;
    }
    ngOnInit() {
      this.initForm();
    }
    initForm() {
      this.form = this.fb.group({
        'title': [ this.city!=null ? this.city.title : '' , Validators.required],
        'content': [this.city!=null ? this.city.content: '' , Validators.required],
        'lat': [this.city!=null ? this.city.lat : null , Validators.required],
        'long': [ this.city!=null ? this.city.long : null , Validators.required],
        'image_url': [this.city!=null ? this.city.image_url : '' , Validators.required]
      });
    }

  onNoClick(): void {

    this.dialogRef.close({data: this.city, action: false});
  }
  onSubmit() {

    this.city = {
      title: this.form.get('title').value,
      content: this.form.get('content').value,
      lat: this.form.get('lat').value,
      long: this.form.get('long').value,
      image_url: this.form.get('image_url').value,
    };
    this.dialogRef.close({data: this.city, action: true});
  }
  getErrorMessage(controlName) {
    return this.form.get(`${controlName}` ).getError('required') ? 'You must enter a value' :
        this.form.get(`${controlName}`).getError('pattern') ? 'Not a valid format' :
            '';
  }
}
