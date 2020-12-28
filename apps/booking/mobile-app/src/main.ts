import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '@nrwl-airlines/shared/root/environments';

import { BookingMobileAppModule } from './app/booking-mobile-app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(BookingMobileAppModule)
  .catch((err) => console.error(err));
