import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getErrorMessage } from './get-error-message.fn';
import { firstErrorMessage } from '../form-control.utils';

@Component({
  selector: 'dom-error',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dom-error.component.html',
})
export class DomErrorComponent {
  readonly control = input<FormControl>();
  readonly field = input<any>();

  readonly getErrorMessage = getErrorMessage;
  readonly firstErrorMessage = firstErrorMessage;
}
