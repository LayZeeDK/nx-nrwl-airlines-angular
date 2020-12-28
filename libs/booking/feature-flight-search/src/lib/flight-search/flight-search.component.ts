import { Component } from '@angular/core';

import { environment } from '@nrwl-airlines/shared/root/environments';

@Component({
  selector: 'booking-flight-search',
  styleUrls: ['./flight-search.component.css'],
  templateUrl:
    environment.platform === 'desktop'
      ? './flight-search.component.html'
      : './flight-search.mobile.component.html',
})
export class FlightSearchComponent {}
