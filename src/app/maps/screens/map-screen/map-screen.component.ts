import { Component, OnInit } from '@angular/core';
import { PlacesServicesService } from '../../services/places-services.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {

  constructor(private placesService: PlacesServicesService) { }
  

  ngOnInit(): void {
  }

}
