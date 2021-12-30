import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePasswordComponent } from './update-password/update-password.component';

import { ViewAddressComponent } from './view-address/view-address.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path: 'view',
    component: ViewProfileComponent,
    
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
    
  },
  {
    path: 'address',
    component: ViewAddressComponent,
    
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./order-history/order-history.module').then(
        (m) => m.OrderHistoryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
