import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PassengerInfoComponent } from './passenger-info/passenger-info.component';
import { PassengerInfoModule } from './passenger-info/passenger-info.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: PassengerInfoComponent },
    ]),
    PassengerInfoModule,
  ],
})
export class BookingFeaturePassengerInfoModule {}
