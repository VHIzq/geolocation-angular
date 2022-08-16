import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesServicesService } from '../../services/places-services.service';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef
    
  constructor(private placesService: PlacesServicesService) { }

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error('There is not placeService.userLocation')


    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v10', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    console.log(this.placesService.userLocation);
  }
}
