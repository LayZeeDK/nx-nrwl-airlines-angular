import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ShellModule } from './shell/shell.module';

export const bookingFeatureShellRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ShellModule],
})
export class BookingFeatureShellModule {}
