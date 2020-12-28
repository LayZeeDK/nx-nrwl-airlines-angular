import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedSeatmapDataAccessModule } from '@nrwl-airlines/shared/seatmap/data-access';

import { SeatListingComponent } from './seat-listing/seat-listing.component';
import { SeatListingModule } from './seat-listing/seat-listing.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SeatListingComponent },
    ]),
    SharedSeatmapDataAccessModule,
    SeatListingModule,
  ],
})
export class SharedSeatmapFeatureSeatListingModule {}
