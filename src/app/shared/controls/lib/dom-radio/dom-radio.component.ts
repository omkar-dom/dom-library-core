import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { resolveFormField, FormModel } from '../form-control.utils';

export interface RadioOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'dom-radio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, DomErrorComponent],
  templateUrl: './dom-radio.component.html',
})
export class DomRadioComponent<T extends FormModel = FormModel> {
  readonly form         = input<any>();
  readonly form_group    = input<FormGroup>();
  readonly form_control = input.required<Extract<keyof T, string>>();
  readonly label        = input<string>('');
  readonly placeholder  = input<string>('');
  readonly hint         = input<string>();
  readonly is_readonly  = input<boolean>(false);
  readonly is_disabled  = input<boolean>(false);
  readonly options      = input<RadioOption[]>([]);
  readonly layout       = input<'vertical' | 'horizontal'>('vertical');

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
    if (f) return f.value();
    return this.legacyControl()?.value;
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

    effect((onCleanup) => {
      const ctrl = this.legacyControl();
      if (ctrl) {
        const val = ctrl.value;
        untracked(() => {
          this.on_change.emit(val);
        });

        const sub = ctrl.valueChanges.subscribe(v => {
          this.on_change.emit(v);
        });

        if (this.is_disabled()) {
          ctrl.disable({ emitEvent: false });
        } else {
          ctrl.enable({ emitEvent: false });
        }

        onCleanup(() => sub.unsubscribe());
      }
    });
  }

  onRadioChange(value: any): void {
    if (this.is_disabled()) return;
    const f = this.field();
    if (f) {
      f.value.set(value as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(value);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    this.on_change.emit(value);
  }

  onBlur(): void {
    const f = this.field();
    if (f) {
      f.markAsTouched();
      this.on_blur.emit(f.value());
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.markAsTouched();
        this.on_blur.emit(ctrl.value);
      }
    }
  }
}
