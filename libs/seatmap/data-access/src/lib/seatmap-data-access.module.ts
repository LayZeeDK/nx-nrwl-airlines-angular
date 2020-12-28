import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSeatmap from './+state/seatmap.reducer';
import { SeatmapEffects } from './+state/seatmap.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSeatmap.SEATMAP_FEATURE_KEY,
      fromSeatmap.reducer
    ),
    EffectsModule.forFeature([SeatmapEffects]),
  ],
})
export class SeatmapDataAccessModule {}
