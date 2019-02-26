import { Component, OnInit, Input } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {easeIn, easeOut} from 'ol/easing.js';
import TileLayer from 'ol/layer/Tile.js';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';
import { Position } from '@angular/compiler';
import { PositionModel } from '../models/position.model';
@Component({
  selector: 'app-heroku-map',
  templateUrl: './heroku-map.component.html',
  styleUrls: ['./heroku-map.component.scss']
})
export class HerokuMapComponent implements OnInit {
  @Input() position: PositionModel = {
    lat: 41.385063,
    long: 2.173404
  };
  view: View;
  geolocation: Location;
  constructor() { }

  ngOnInit() {
    this.geolocation = fromLonLat([this.position.long, this.position.lat]);
    this.view = new View({
      center: this.geolocation,
      zoom: 6
    });

    var map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM()
        })
      ],
      // Improve user experience by loading tiles while animating. Will make
      // animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: true,
      view: this.view
    });

 
  }
  flyTo(position: PositionModel, done) {
    this.geolocation = fromLonLat([position.long, position.lat]);
    var duration = 2000;
    var zoom = this.view.getZoom();
    var parts = 2;
    var called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    this.view.animate({
      center: this.geolocation,
      duration: duration
    }, callback);
    this.view.animate({
      zoom: zoom - 1,
      duration: duration / 2
    }, {
      zoom: zoom,
      duration: duration / 2
    }, callback);
  }
}
