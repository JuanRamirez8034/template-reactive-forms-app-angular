import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { TemplateRoutingModule } from './template-routing.module';
import { BasicsComponent } from './components/basics/basics.component';
import { SwitchesComponent } from './components/switches/switches.component';
import { DynamicsComponent } from './components/dynamics/dynamics.component';
import { CustomMinNumberDirective } from './directives/custom-min-number.directive';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    BasicsComponent,
    SwitchesComponent,
    DynamicsComponent,
    CustomMinNumberDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TemplateRoutingModule,
    ComponentsModule
  ]
})
export class TemplateModule { }
