import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesReponse, Feature } from '../interfaces/places.interfaces';

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

  constructor( private http: HttpClient) {
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

    this.isLoadingPlaces = true;

    this.http.get<PlacesReponse>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&proximity=-73.990593%2C40.740121&types=place%2Cpostcode%2Caddress&language=en&access_token=pk.eyJ1IjoidmhpenEiLCJhIjoiY2wzZHY2OHkxMDU0NzNqcXl1aHo0a3NjMSJ9.0xYREArve0kMa35wFPf6Gg`
    ).subscribe(resp => {
      console.log(resp.features);
      this.isLoadingPlaces = false;
      this.places = resp.features;
    })


  }
}
