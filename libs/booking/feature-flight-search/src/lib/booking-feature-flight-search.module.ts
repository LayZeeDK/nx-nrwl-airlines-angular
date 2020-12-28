import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSearchModule } from './flight-search/flight-search.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: FlightSearchComponent },
    ]),
    FlightSearchModule,
  ],
})
export class BookingFeatureFlightSearchModule {}
