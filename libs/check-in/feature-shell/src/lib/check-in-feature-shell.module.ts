import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CheckInDataAccessModule } from '@nrwl-airlines/check-in/data-access';
import { SharedRootDataAccessModule } from '@nrwl-airlines/shared/root/data-access';

import { ShellComponent } from './shell/shell.component';
import { ShellModule } from './shell/shell.module';

const checkInFeatureShellRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'seat-listing',
      },
      {
        path: 'seat-listing',
        loadChildren: () =>
          import('@nrwl-airlines/shared/seatmap/feature-seat-listing').then(
            (module) => module.SharedSeatmapFeatureSeatListingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(checkInFeatureShellRoutes),
    SharedRootDataAccessModule,
    CheckInDataAccessModule,
    ShellModule,
  ],
})
export class CheckInFeatureShellModule {}
