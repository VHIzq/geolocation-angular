import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken =
  'pk.eyJ1IjoidmhpenEiLCJhIjoiY2wzZHY2OHkxMDU0NzNqcXl1aHo0a3NjMSJ9.0xYREArve0kMa35wFPf6Gg';

if (!navigator.geolocation) {
  alert('Browser doesnt support geolocatio');
  throw new Error('Browser doesnt support geolocatio');
} 

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
