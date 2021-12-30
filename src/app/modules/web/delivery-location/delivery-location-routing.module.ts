import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLocationComponent } from './add-location/add-location.component';

const routes: Routes = [
  {
    path: '',
    component: AddLocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryLocationRoutingModule { }
