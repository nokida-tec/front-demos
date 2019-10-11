import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
  NbSelectModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { SystemBasicDataRoutingModule } from './system-basic-data-routing.module';
import { SystemBasicDataComponent } from './system-basic-data.component';
import { StepperComponent } from './stepper/stepper.component';
import { SupplierComponent } from "./supplier/supplier.component";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    Ng2SmartTableModule,
    NbSelectModule,
    SystemBasicDataRoutingModule,
  ],
  declarations: [
    SystemBasicDataComponent,
    StepperComponent,
    SupplierComponent,
  ],
  providers: [
  ],
})
export class SystemBasicDataModule { }
