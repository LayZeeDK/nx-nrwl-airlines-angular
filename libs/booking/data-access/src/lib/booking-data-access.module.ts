import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBooking from './+state/booking.reducer';
import { BookingEffects } from './+state/booking.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromBooking.BOOKING_FEATURE_KEY,
      fromBooking.reducer
    ),
    EffectsModule.forFeature([BookingEffects]),
  ],
})
export class BookingDataAccessModule {}
