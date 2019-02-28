import { Component, OnInit, Input } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';
import Feature from 'ol/Feature.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import Point from 'ol/geom/Point.js';
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style.js';
import { PositionModel } from '../models/position.model';
import { coordinate} from 'ol/coordinate.js'
import VectorSource from 'ol/source/Vector.js';
@Component({
  selector: 'app-city-map',
  templateUrl: './city-map.component.html',
  styleUrls: ['./city-map.component.scss']
})
export class CityMapComponent implements OnInit {
  @Input() position: PositionModel = {
    lat: 41.385063,
    long: 2.173404
  };
  view: View;
  geolocation: coordinate;
  geoMarker: Feature;
  style: Style;
  map: Map;
  vectorLayer : VectorLayer;
  constructor() { }

  ngOnInit() {
    this.initMap();
  }
  initMap() {
    this.geolocation = fromLonLat([this.position.long, this.position.lat]);
    this.view = new View({
      center: fromLonLat([this.position.long, this.position.lat]),
      zoom: 8
    });
    this.style = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'assets/img/location.png'
      })
    });
    this.geoMarker = new Feature({
      type: 'icon',
      geometry: new Point(fromLonLat([this.position.long, this.position.lat]))
    });
    this.geoMarker.setStyle(this.style);
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [this.geoMarker]
      })
    });
     this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM()
        }), this.vectorLayer
      ],
      loadTilesWhileAnimating: true,
      view: this.view
    });
  }
  flyTo(position: PositionModel, done) {
    this.geolocation = fromLonLat([position.long, position.lat]);
    this.geoMarker.setGeometry(new Point(this.geolocation));
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
      zoom: zoom - 4,
      duration: duration / 2
    }, {
      zoom: zoom,
      duration: duration / 2
    }, callback);
  }
}
