import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSliderComponent } from './range-slider.component';
import {ClickOutsideDirective} from './click-outside.directive';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RangeSliderComponent,ClickOutsideDirective],
  exports:[RangeSliderComponent,ClickOutsideDirective]
})
export class RangeSliderModule { }
