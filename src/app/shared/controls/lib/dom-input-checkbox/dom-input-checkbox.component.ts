import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { resolveFormField, FormModel } from '../form-control.utils';

export interface CheckboxOption {
  id:    string;
  title: string;
  disabled?: boolean;
}

@Component({
  selector: 'dom-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, DomErrorComponent, FormField],
  templateUrl: './dom-input-checkbox.component.html',
})
export class DomCheckboxComponent<T extends FormModel = FormModel> {
  readonly form            = input<FieldTree<T>>();
  readonly form_group      = input<FormGroup>();
  readonly form_control    = input.required<Extract<keyof T, string>>();
  readonly label           = input<string>('');
  readonly placeholder     = input<string>('');
  readonly hint            = input<string>();
  readonly is_readonly     = input<boolean>(false);
  readonly is_disabled     = input<boolean>(false);
  readonly options         = input<CheckboxOption[]>([]);
  readonly id_property     = input<string>('id');
  readonly title_property  = input<string>('title');
  readonly layout          = input<'vertical' | 'horizontal'>('vertical');

  readonly on_change = output<any>();
  readonly on_blur   = output<any>();

  readonly checked_values = signal<any[]>([]);

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

  constructor() {
    effect(() => {
      const f = this.field();
      if (f) {
        const val = f.value();
        untracked(() => {
          if (Array.isArray(val)) {
            this.checked_values.set(val);
          }
          this.on_change.emit(val);
        });
      }
    });

    effect((onCleanup) => {
      const ctrl = this.legacyControl();
      if (ctrl) {
        // Init value
        const val = ctrl.value;
        if (Array.isArray(val)) {
          this.checked_values.set(val);
        }

        const sub = ctrl.valueChanges.subscribe(v => {
          if (Array.isArray(v)) {
            this.checked_values.set(v);
          }
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

  isChecked(val: any): boolean {
    return this.checked_values().includes(val) && !this.options().find(opt => opt.id === val)?.disabled;
  }

  toggle(val: any): void {
    if (this.is_disabled()) return;
    const current = [...this.checked_values()];
    const idx = current.indexOf(val);
    if (idx > -1) {
      current.splice(idx, 1);
    } else {
      current.push(val);
    }
    this.checked_values.set(current);

    const f = this.field();
    if (f) {
      f.value.set(current as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(current);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    this.on_change.emit(current);
  }
}
