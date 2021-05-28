import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreRoutingModule } from './core-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
  ,exports: [RouterModule]
})
export class CoreModule { }
