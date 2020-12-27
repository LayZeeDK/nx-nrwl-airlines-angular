import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  BookingFeatureShellModule,
  bookingFeatureShellRoutes,
} from '@nrwl-airlines/booking/feature-shell';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BookingFeatureShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
