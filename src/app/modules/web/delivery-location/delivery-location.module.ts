import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryLocationRoutingModule } from './delivery-location-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddLocationComponent } from './add-location/add-location.component';


@NgModule({
  declarations: [
    AddLocationComponent
  ],
  imports: [
    CommonModule,
    DeliveryLocationRoutingModule,
    SharedModule
  ]
})
export class DeliveryLocationModule { }
