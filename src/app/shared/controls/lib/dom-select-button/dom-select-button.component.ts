import { Component, input, output, computed, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { resolveFormField, FormModel } from '../form-control.utils';

export interface SelectButtonOption {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'dom-select-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DomErrorComponent],
  templateUrl: './dom-select-button.component.html',
  styleUrl: './dom-select-button.component.css',
})
export class DomSelectButtonComponent<T extends FormModel = FormModel> {
  readonly form = input<any>();
  readonly form_group = input<FormGroup>();
  readonly form_control = input.required<Extract<keyof T, string>>();
  readonly options = input.required<SelectButtonOption[]>();
  readonly multiple = input<boolean>(false);
  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly is_disabled = input<boolean>(false);

  readonly on_change = output<any>();

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

  isSelected(optionValue: any): boolean {
    const currentValue = this.currentValue();
    if (this.multiple()) {
      return Array.isArray(currentValue) && (currentValue as any[]).includes(optionValue);
    }
    return currentValue === optionValue;
  }

  selectOption(option: SelectButtonOption): void {
    if (this.is_disabled() || option.disabled) return;

    const currentValue = this.currentValue();
    let newValue: any;

    if (this.multiple()) {
      let tempArray: any[] = Array.isArray(currentValue) ? [...currentValue] : [];
      if (tempArray.includes(option.value)) {
        tempArray = tempArray.filter((v) => v !== option.value);
      } else {
        tempArray.push(option.value);
      }
      newValue = tempArray;
    } else {
      if (currentValue === option.value) {
        newValue = null;
      } else {
        newValue = option.value;
      }
    }

    const f = this.field();
    if (f) {
      f.value.set(newValue as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(newValue);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    this.on_change.emit(newValue);
  }
}
