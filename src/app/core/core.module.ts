import { NgModule, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from 'src/app/core/auth/auth.module';
import { BlockUIModule } from 'ng-block-ui';
import { UiLoaderComponent } from './components/ui-loader/ui-loader.component';


const ownComponents = [
  UiLoaderComponent,
];



@NgModule({
  declarations: ownComponents,
  imports: [
    CommonModule,
    AuthModule,
    BlockUIModule.forRoot()
  ],
  exports: ownComponents
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
