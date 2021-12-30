import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToStringPipe',
})
export class ObjectToStringPipePipe implements PipeTransform {
  transform(object: any): any {
    if (!(typeof object === 'string')) {
      for (let prop in object) {
        let displayValue = object[prop];

        if (displayValue != null && typeof displayValue === 'string') {
          object = displayValue;
        }
      }
    }
    if ((typeof object === 'undefined')){
      object = "N/A"
    }
    return object;
  }
}
