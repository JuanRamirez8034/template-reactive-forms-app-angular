import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveRoutingModule } from './reactive-routing.module';
import { BasicsComponent } from './components/basics/basics.component';
import { SwitchesComponent } from './components/switches/switches.component';
import { DynamicsComponent } from './components/dynamics/dynamics.component';


@NgModule({
  declarations: [
    BasicsComponent,
    SwitchesComponent,
    DynamicsComponent
  ],
  imports: [
    CommonModule,
    ReactiveRoutingModule
  ]
})
export class ReactiveModule { }
