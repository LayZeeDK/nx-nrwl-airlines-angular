import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BookingFeatureShellModule } from '@nrwl-airlines/booking/feature-shell';

import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, BookingFeatureShellModule, RouterModule],
})
export class AppModule {}
