import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BookingDataAccessModule } from '@nrwl-airlines/booking/data-access';
import { SharedRootDataAccessModule } from '@nrwl-airlines/shared/root/data-access';

import { ShellComponent } from './shell/shell.component';
import { ShellModule } from './shell/shell.module';

const bookingFeatureShellRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'flight-search',
      },
      {
        path: 'booking-feature-flight-search',
        loadChildren: () =>
          import('@nrwl-airlines/booking/feature-flight-search').then(
            (module) => module.BookingFeatureFlightSearchModule
          ),
      },
      {
        path: 'booking-feature-passenger-info',
        loadChildren: () =>
          import('@nrwl-airlines/booking/feature-passenger-info').then(
            (module) => module.BookingFeaturePassengerInfoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(bookingFeatureShellRoutes),
    SharedRootDataAccessModule,
    BookingDataAccessModule,
    ShellModule,
  ],
})
export class BookingFeatureShellModule {}
