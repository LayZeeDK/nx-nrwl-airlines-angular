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
    children: [],
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
