import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SystemBasicDataComponent} from "./system-basic-data.component";
import { StepperComponent } from './stepper/stepper.component';
import { SupplierComponent } from "./supplier/supplier.component";

const routes: Routes = [{
  path: '',
  component: SystemBasicDataComponent,
  children: [
    {
      path: 'stepper',
      component: StepperComponent,
    },
    {
      path: 'supplier',
      component: SupplierComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemBasicDataRoutingModule {
}
