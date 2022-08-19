import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  
  private debounceTimer?: NodeJS.Timeout;
  
  constructor() { }

  onQueryChange(query: string = '') {

    const hasDebounceTimeValue = !!this.debounceTimer;

    if (hasDebounceTimeValue) clearTimeout(this.debounceTimer);
    
    this.debounceTimer = setTimeout(() => {
      console.log('send query:', query);
    }, 750)
  }
}
