import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { ListOrderComponent } from './list-order/list-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedbackComponent } from './feedback/feedback.component';


@NgModule({
  declarations: [
    ListOrderComponent,
    ViewOrderComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
    SharedModule
  ]
})
export class OrderHistoryModule { }
