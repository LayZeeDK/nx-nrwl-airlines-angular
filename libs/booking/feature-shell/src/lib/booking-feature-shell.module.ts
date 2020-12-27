import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

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
  imports: [RouterModule.forRoot(bookingFeatureShellRoutes), ShellModule],
})
export class BookingFeatureShellModule {}
