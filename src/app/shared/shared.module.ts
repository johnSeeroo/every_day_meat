import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { ModalService } from './services/common/modal.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from "ngx-spinner";


const exportable = [
  CommonModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  ComponentsModule,
  PipesModule,
  CarouselModule,
  NgxSpinnerModule
];

@NgModule({
  declarations: [
  ],
  imports: exportable,
  exports: exportable,
  providers: [ModalService , DatePipe],
})
export class SharedModule { }
