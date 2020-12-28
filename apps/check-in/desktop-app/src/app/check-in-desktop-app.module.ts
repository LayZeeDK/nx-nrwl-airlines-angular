import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CheckInFeatureShellModule } from '@nrwl-airlines/check-in/feature-shell';

import { CheckInDesktopAppComponent } from './check-in-desktop-app.component';

@NgModule({
  bootstrap: [CheckInDesktopAppComponent],
  declarations: [CheckInDesktopAppComponent],
  imports: [BrowserModule, CheckInFeatureShellModule, RouterModule],
})
export class CheckInDesktopAppModule {}
