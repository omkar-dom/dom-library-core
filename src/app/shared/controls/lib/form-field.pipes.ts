import { Pipe, PipeTransform } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';

import { firstErrorMessage, shouldShowError } from './form-control.utils';

@Pipe({
  name: 'formFieldShowError',
  pure: true,
  standalone: true,
})
export class FormFieldShowErrorPipe implements PipeTransform {
  transform(touched: boolean, invalid: boolean): boolean {
    return shouldShowError(touched, invalid);
  }
}

@Pipe({
  name: 'formFieldFirstError',
  pure: true,
  standalone: true,
})
export class FormFieldFirstErrorPipe implements PipeTransform {
  transform(
    errors: readonly ValidationError.WithOptionalFieldTree[] | undefined,
  ): string {
    return firstErrorMessage(errors);
  }
}
