import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { HomeComponent } from './home/home.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { WebComponent } from './web.component';


const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'web/sign-in',
        component: SignInComponent,
        
      },
      {
        path: 'web/request-location',
        loadChildren: () =>
          import('./delivery-location/delivery-location.module').then(
            (m) => m.DeliveryLocationModule
          ),
      },
      {
        path: 'web/product',
        loadChildren: () =>
          import('./product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'web/category',
        component: ListCategoryComponent,
      },
      {
        path: 'web/cart',
        component: CartComponent,
        
      },
      {
        path: 'web/profile',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'web/page/:cms_slug',
        component: CmsPageComponent,
        
      },
      {
        path: 'web/checkout',
        canActivate: [AuthGuard],
        component: CheckoutComponent,
        
      },
      {
        path: 'web/sign-up',
        component: SignUpComponent,
        
      },
      {
        path: 'web/sign-in/:public_id',
        component: SignInComponent,
        
      },


      
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
