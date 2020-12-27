import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BookingFeatureShellModule } from '@nrwl-airlines/booking/feature-shell';

import { BookingDesktopAppComponent } from './booking-desktop-app.component';

@NgModule({
  bootstrap: [BookingDesktopAppComponent],
  declarations: [BookingDesktopAppComponent],
  imports: [BrowserModule, BookingFeatureShellModule, RouterModule],
})
export class BookingDesktopAppModule {}
