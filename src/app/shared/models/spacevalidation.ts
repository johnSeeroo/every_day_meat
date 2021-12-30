import { AbstractControl } from '@angular/forms';

export function Validatespace(control: AbstractControl) {
  if(control.value !='' && control.value != null){
    
  var plainText = control.value.replace(/<[^>]*>/g, '');
  plainText = plainText.replace(/&nbsp;/g, '');
 
  if (plainText != null) {
    if (plainText.trim() === '') {
      return { validspace: true };
    } else {
      return null;
    }
  }
}
}
export function trueFalseValidator(control: AbstractControl) {
  if (control.value != null && !control.value) {
    return { validate: true };
  } else {
    return null;
  }
}

