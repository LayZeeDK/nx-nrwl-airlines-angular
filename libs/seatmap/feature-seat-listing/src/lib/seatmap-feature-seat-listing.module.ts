import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeatmapDataAccessModule } from '@nrwl-airlines/seatmap/data-access';

import { SeatListingComponent } from './seat-listing/seat-listing.component';
import { SeatListingModule } from './seat-listing/seat-listing.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SeatListingComponent },
    ]),
    SeatmapDataAccessModule,
    SeatListingModule,
  ],
})
export class SeatmapFeatureSeatListingModule {}
