import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BookingFeatureShellModule } from '@nrwl-airlines/booking/feature-shell';

import { BookingMobileAppComponent } from './booking-mobile-app.component';

@NgModule({
  bootstrap: [BookingMobileAppComponent],
  declarations: [BookingMobileAppComponent],
  imports: [BrowserModule, BookingFeatureShellModule, RouterModule],
})
export class BookingMobileAppModule {}
