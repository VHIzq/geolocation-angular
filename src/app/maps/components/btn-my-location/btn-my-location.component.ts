import { Component } from '@angular/core';
import { MapService, PlacesServicesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css'],
})
export class BtnMyLocationComponent {
  constructor(
    private mapService: MapService,
    private placeService: PlacesServicesService
  ) { }

  goToMyLocation() {
    const isLocationReady = !!this.placeService.isUserLocationReady;
    const isMapReady = !!this.mapService.isMapready ;
    
    if (isLocationReady && isMapReady) {
      this.mapService.flyTo(this.placeService.userLocation!)
    }

  }
}
