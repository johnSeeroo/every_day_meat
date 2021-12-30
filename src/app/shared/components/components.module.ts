import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../modules/material.module';

import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ownComponents = [

  HeaderComponent,
  FooterComponent,
  BreadcrumbComponent,
  ConfirmModalComponent
]


@NgModule({
  declarations: ownComponents,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: ownComponents

})
export class ComponentsModule { }
