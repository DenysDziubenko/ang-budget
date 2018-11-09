import {ValidationDirective} from './directives/validation.directive';
import {ErrorsPipe} from './pipes/error.pipe';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [
    ValidationDirective,
    ErrorsPipe
  ],
  exports: [
    CommonModule,
    ValidationDirective,
    ErrorsPipe
  ]
})
export class SharedModule {}
