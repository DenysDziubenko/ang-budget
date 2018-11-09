import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'errors'})
export class ErrorsPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return;
    }
    let resStr = ``;
    if (value.required) {
      resStr = `Field is required. `;
    }

    if (!value.validationError) {
      return resStr;
    }

    const {valType, isLengthOk, maxLength, len} = value.validationError;
    if (valType === 'posint' || valType === 'email') {
      if (!isLengthOk) {
        resStr += ` Maximum character range is ${maxLength}, actual is ${len}.`;
      }
      if (valType === 'email') {
        resStr += ` Invalid email.`;
      }
      if (valType === 'posint') {
        resStr += ` Invalid number, should be positive.`;
      }
    } else {
      resStr += ` Invalid data format, should be 'yyyy/mm/dd'.`;
    }
    return resStr;
  }
}
