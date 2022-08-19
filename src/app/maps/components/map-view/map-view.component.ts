import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService, PlacesServicesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef
    
  constructor(
    private placesService: PlacesServicesService,
    private mapService: MapService
  ) { }

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error('There is not placeService.userLocation')


    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v10', 
      center: this.placesService.userLocation,
      zoom: 14, // starting zoom
    });

    const popUp = new Popup()
      .setHTML(`
        <h6>I'm here</h6>
        <span>In this world place</span>
      `);
    
    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocation)
      .setPopup(popUp)
      .addTo(map)
    
    this.mapService.setMap(map);
  }
}
