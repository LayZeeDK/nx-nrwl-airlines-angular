import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CheckInRootFeatureShellModule } from '@nrwl-airlines/check-in/root/feature-shell';

import { CheckInMobileAppComponent } from './check-in-mobile-app.component';

@NgModule({
  bootstrap: [CheckInMobileAppComponent],
  declarations: [CheckInMobileAppComponent],
  imports: [BrowserModule, CheckInRootFeatureShellModule, RouterModule],
})
export class CheckInMobileAppModule {}
