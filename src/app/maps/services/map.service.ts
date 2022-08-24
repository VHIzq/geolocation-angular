import { Injectable } from '@angular/core';
import {
  AnySourceData,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { DirectionsApiClient } from '../api';
import { Feature } from '../interfaces/places.interfaces';
import { DirectionsResponse, Route } from '../interfaces/directions.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: Map;
  private markers: Marker[] = [];

  constructor(private directionsApi: DirectionsApiClient) {}

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

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    const hasMap = this.map;
    const hasResults = !!places;
    const newMarkers = [];

    if (!hasMap) throw Error('Map not initialized');

    this.markers.forEach((marker) => marker.remove());
    for (const place of places) {
      const [lng, lat] = place.center;
      const popUp = new Popup().setHTML(`
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
    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200,
    });
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi
      .get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((resp) => {
        this.drawPolyline(resp.routes[0]);
      });
  }

  private drawPolyline(route: Route) {
    console.log({ km: route.distance / 1000, duration: route.duration / 60 });

    const isLoadMap = !!this.map;

    if (!isLoadMap) throw Error('Map not initilized');

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds(bounds, {
      padding: 200,
    });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };
    const hasMapLayer = !!this.map.getLayer('RouteString')

    if (hasMapLayer) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'red',
        'line-width': 3,
      },
    });
  }
}
