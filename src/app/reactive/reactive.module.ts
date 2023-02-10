import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveRoutingModule } from './reactive-routing.module';
import { BasicsComponent } from './components/basics/basics.component';
import { SwitchesComponent } from './components/switches/switches.component';
import { DynamicsComponent } from './components/dynamics/dynamics.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BasicsComponent,
    SwitchesComponent,
    DynamicsComponent
  ],
  imports: [
    CommonModule,
    ReactiveRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,//modulo para formularios reactivos
  ]
})
export class ReactiveModule { }
