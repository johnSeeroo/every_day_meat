import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CarouselModule } from "ngx-owl-carousel-o";
import { RouterModule } from '@angular/router';
import { LocationPopupComponent } from './delivery-location/location-popup/location-popup.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CartComponent } from './cart/cart.component';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [WebComponent, HomeComponent, SignInComponent, SignUpComponent, LocationPopupComponent, ListCategoryComponent, CartComponent, CmsPageComponent, CheckoutComponent, ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    CarouselModule,
    RouterModule
  ]
})
export class WebModule { }
