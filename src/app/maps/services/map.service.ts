import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: Map;
  private markers: Marker[] = [];

  get isMapready() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    const isMapReady = !!this.isMapready;
    if (!isMapReady) throw Error('The map is not initialized');
    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number] ) {
    const hasMap = this.map;
    const hasResults = !!places;
    const newMarkers = [];

    if (!hasMap) throw Error('Map not initialized');

    this.markers.forEach(marker => marker.remove())
      for (const place of places) {
        const [lng, lat] = place.center;
        const popUp = new Popup()
          .setHTML(`
            <h6>${place.text} </h6>
            <span>${place.place_name} </span>
          `);
        const newMarker = new Marker()
          .setLngLat([lng, lat])
          .setPopup(popUp)
          .addTo(this.map);
        
        newMarkers.push(newMarker);
      }
    
    this.markers = newMarkers;

    if (!hasResults) return;

    //* limites del mapa
    
    const bounds = new LngLatBounds();
    newMarkers.forEach(marker =>
      bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding:200
    });
  }
}



