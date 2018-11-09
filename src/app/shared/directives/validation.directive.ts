import {Directive, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[valType][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidationDirective),
      multi: true
    }
  ]
})
export class ValidationDirective implements Validator, OnInit {
  @Input() valType: string;
  @Input() maxLength: number = Number.MAX_SAFE_INTEGER;
  validator;
  patterns = {
    'date' : /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/,
    'posint': /^[\d]*$/,
    'email': /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
  };

  ngOnInit() {
    this.validator = this.getValidator(this.valType, this.maxLength);
  }

  validate(control: AbstractControl) {
    return control.value ? this.validator(control) : null;
  }

  private getValidator(valType: string, maxLength: number) {
    return (control: AbstractControl) => {
      const {value} = control;
      const isValid = new RegExp(this.patterns[`${valType}`]).test(value);
      let isLengthOk = true;

      if (typeof value  === 'string') {
        isLengthOk = value.length < maxLength;
      }

      return (!isValid || !isLengthOk) ? {
        'validationError': { valType, isLengthOk, len: value.length, maxLength }
      } : null;

    };
  }
}
