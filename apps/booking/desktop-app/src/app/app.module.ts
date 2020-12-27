import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BookingFeatureShellModule } from '@nrwl-airlines/booking/feature-shell';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BookingFeatureShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
