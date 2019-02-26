import { City } from './../models/city';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-heroku-update-form',
  templateUrl: './heroku-update-form.component.html',
  styleUrls: ['./heroku-update-form.component.scss']
})
export class HerokuUpdateFormComponent implements OnInit {
  form: FormGroup;
  @Input() cityModified: City;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
  }
  initForm() {
    this.form = this._fb.group({
      title: [this.cityModified.title, Validators.required],
      content: [this.cityModified.content, Validators.required],
      lat: [this.cityModified.lat, Validators.required],
      long: [this.cityModified.long, Validators.required],
      image_url: [this.cityModified.image_url, Validators.required]
    });
  }
}
