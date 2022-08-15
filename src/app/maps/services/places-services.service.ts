import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesServicesService {
  public userLocation: [number, number] | undefined;

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
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
}
