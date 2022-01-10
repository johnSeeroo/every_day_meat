import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ListingProductComponent } from './listing-product/listing-product.component';

const routes: Routes = [
  {
    path: 'list/:category_id/:category_name',
    component: ListingProductComponent,
  },
  {
    path: 'detail/:product_id',
    component: DetailProductComponent,
  },
  {
    path: 'searchProduct/:search_key_word',
    component: ListingProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
