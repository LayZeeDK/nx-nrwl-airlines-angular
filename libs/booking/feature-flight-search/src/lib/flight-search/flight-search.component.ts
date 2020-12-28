import { Component } from '@angular/core';
import { environment } from '@nrwl-airlines/shared/root/environments';

@Component({
  selector: 'booking-flight-search',
  styleUrls: ['./flight-search.component.scss'],
  templateUrl:
    environment.platform === 'mobile'
      ? './flight-search.mobile.component.html'
      : './flight-search.component.html',
})
export class FlightSearchComponent {}
