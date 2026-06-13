import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  untracked,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { resolveFormField, FormModel } from '../form-control.utils';

@Component({
  selector: 'dom-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, DomErrorComponent, FormField],
  templateUrl: './dom-input-toggle.component.html',
})
export class DomToggleComponent<T extends FormModel = FormModel> {
  readonly form         = input<FieldTree<T>>();
  readonly form_group    = input<FormGroup>();
  readonly form_control = input.required<Extract<keyof T, string>>();
  readonly label        = input<string>('');
  readonly placeholder  = input<string>('');
  readonly hint         = input<string>();
  readonly is_readonly  = input<boolean>(false);
  readonly is_disabled  = input<boolean>(false);
  readonly on_label     = input<string>('On');
  readonly off_label    = input<string>('Off');

  readonly on_change = output<any>();
  readonly on_blur   = output<any>();

  readonly legacyControl = computed(() => {
    const group = this.form_group();
    const ctrlName = this.form_control() as string;
    return group?.get(ctrlName) as FormControl;
  });

  protected readonly resolvedFormField = resolveFormField(this.form, this.form_control);
  protected readonly field = computed(() => {
    const resolved = this.resolvedFormField();
    return resolved ? resolved() : undefined;
  });

  readonly is_required = computed(() => {
    const f = this.field();
    if (f) return f.required();
    return this.legacyControl()?.hasValidator(Validators.required) ?? false;
  });

  readonly currentValue = computed(() => {
    const f = this.field();
    if (f) return !!f.value();
    return !!this.legacyControl()?.value;
  });

  constructor() {
    effect(() => {
      const f = this.field();
      if (f) {
        const val = f.value();
        untracked(() => {
          this.on_change.emit(val);
        });
      }
    });

    effect(() => {
      const ctrl = this.legacyControl();
      if (ctrl) {
        if (this.is_disabled()) {
          ctrl.disable({ emitEvent: false });
        } else {
          ctrl.enable({ emitEvent: false });
        }
      }
    });
  }
}
