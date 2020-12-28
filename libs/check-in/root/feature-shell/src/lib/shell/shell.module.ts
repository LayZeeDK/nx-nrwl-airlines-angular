import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, RouterModule],
})
export class ShellModule {}
