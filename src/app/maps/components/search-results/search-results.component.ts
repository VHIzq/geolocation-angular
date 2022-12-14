import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places.interfaces';
import { PlacesServicesService, MapService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  public selectedId: string = '';

  constructor(
    private placesService: PlacesServicesService,
    private mapService: MapService
  ) {}

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;

    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {
    const isUserLocation = !!this.placesService.userLocation

    if (!isUserLocation) throw Error("There isn't user locations");

    this.placesService.deletePlaces();

    const start = this.placesService.userLocation!; 
    const end = place.center as [number,number] ;

    this.mapService.getRouteBetweenPoints(start, end);
  }
}
