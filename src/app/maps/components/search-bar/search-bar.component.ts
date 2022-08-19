import { Component } from '@angular/core';
import { PlacesServicesService } from '../../services/places-services.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  
  private debounceTimer?: NodeJS.Timeout;
  
  constructor( private placesService: PlacesServicesService) { }

  onQueryChange(query: string = '') {

    const hasDebounceTimeValue = !!this.debounceTimer;

    if (hasDebounceTimeValue) clearTimeout(this.debounceTimer);
    
    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query)
    }, 1000)
  }
}
