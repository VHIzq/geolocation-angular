import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;

  get isMapready() {
    return !!this.map
  }

  setMap(map: Map) {
    this.map = map
  }

  flyTo(coords: LngLatLike) {

    const isMapReady = !!this.isMapready;
    if (!isMapReady) throw Error('The map is not initialized');
    this.map?.flyTo({
      zoom: 14,
      center: coords
      })
  }

}
