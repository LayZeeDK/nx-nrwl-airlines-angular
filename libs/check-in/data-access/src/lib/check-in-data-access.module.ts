import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CheckInEffects } from './+state/check-in.effects';
import * as fromCheckIn from './+state/check-in.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCheckIn.CHECK_IN_FEATURE_KEY,
      fromCheckIn.reducer
    ),
    EffectsModule.forFeature([CheckInEffects]),
  ],
})
export class CheckInDataAccessModule {}
