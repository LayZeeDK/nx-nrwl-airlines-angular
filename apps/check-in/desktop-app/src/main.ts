import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '@nrwl-airlines/shared/root/environments';

import { CheckInDesktopAppModule } from './app/check-in-desktop-app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(CheckInDesktopAppModule)
  .catch((err) => console.error(err));
