import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BookingRootFeatureShellModule } from '@nrwl-airlines/booking/root/feature-shell';

import { BookingMobileAppComponent } from './booking-mobile-app.component';

@NgModule({
  bootstrap: [BookingMobileAppComponent],
  declarations: [BookingMobileAppComponent],
  imports: [BrowserModule, BookingRootFeatureShellModule, RouterModule],
})
export class BookingMobileAppModule {}
