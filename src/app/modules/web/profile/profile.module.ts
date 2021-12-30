import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewAddressComponent } from './view-address/view-address.component';


@NgModule({
  declarations: [
    ViewProfileComponent,
    UpdatePasswordComponent,
    ViewAddressComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
