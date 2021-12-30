import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectToStringPipePipe } from './object-to-string-pipe.pipe';
import { NumberToWordsPipePipe } from './number-to-words-pipe.pipe';




@NgModule({
  declarations: [
  
    ObjectToStringPipePipe,
       NumberToWordsPipePipe
  ],
  imports: [
    CommonModule,

  ],
  exports: [ObjectToStringPipePipe, NumberToWordsPipePipe]
})
export class PipesModule { }
