import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CheckInFeatureShellModule } from '@nrwl-airlines/check-in/feature-shell';

import { CheckInMobileAppComponent } from './check-in-mobile-app.component';

@NgModule({
  bootstrap: [CheckInMobileAppComponent],
  declarations: [CheckInMobileAppComponent],
  imports: [BrowserModule, CheckInFeatureShellModule, RouterModule],
})
export class CheckInMobileAppModule {}
