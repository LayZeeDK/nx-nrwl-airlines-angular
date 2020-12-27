import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PassengerInfoModule } from './passenger-info/passenger-info.module';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),

    PassengerInfoModule,
  ],
})
export class BookingFeaturePassengerInfoModule {}
