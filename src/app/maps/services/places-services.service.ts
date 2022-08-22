import { Injectable } from '@angular/core';
import { PlacesReponse, Feature } from '../interfaces/places.interfaces';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesServicesService {
  public userLocation: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert("Couldn't get the geolocation from user ");
          console.log('error', err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    // todo: evalute if query is null
    if (query.length === 0) {
      this.isLoadingPlaces = false
      this.places = [];
      return;
    }
    
    if (!this.userLocation) throw Error("User Location doesn't exist")

    this.isLoadingPlaces = true;

    this.placesApi
      .get<PlacesReponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(','),
        },
      })
      .subscribe((resp) => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);
      });
  }
}
