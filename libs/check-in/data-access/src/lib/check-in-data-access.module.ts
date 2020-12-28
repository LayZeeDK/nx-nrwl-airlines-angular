import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCheckIn from './+state/check-in.reducer';
import { CheckInEffects } from './+state/check-in.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCheckIn.CHECKIN_FEATURE_KEY,
      fromCheckIn.reducer
    ),
    EffectsModule.forFeature([CheckInEffects]),
  ],
})
export class CheckInDataAccessModule {}
