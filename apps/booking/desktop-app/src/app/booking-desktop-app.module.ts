import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BookingRootFeatureShellModule } from '@nrwl-airlines/booking/root/feature-shell';

import { BookingDesktopAppComponent } from './booking-desktop-app.component';

@NgModule({
  bootstrap: [BookingDesktopAppComponent],
  declarations: [BookingDesktopAppComponent],
  imports: [BrowserModule, BookingRootFeatureShellModule, RouterModule],
})
export class BookingDesktopAppModule {}
