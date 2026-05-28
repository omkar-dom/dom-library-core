import { Component, input, output, computed, inject, DestroyRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomErrorComponent } from '../dom-error/dom-error.component';

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
export class DomSelectButtonComponent {
  readonly form_group = input.required<FormGroup>();
  readonly form_control = input.required<string>();
  readonly options = input.required<SelectButtonOption[]>();
  readonly multiple = input<boolean>(false);
  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly is_disabled = input<boolean>(false);

  readonly on_change = output<any>();

  readonly control = computed<FormControl>(
    () => this.form_group().get(this.form_control()) as FormControl
  );

  readonly is_required = computed(() => {
    const ctrl = this.control();
    return ctrl ? ctrl.hasValidator(Validators.required) : false;
  });

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      if (this.is_disabled()) {
        ctrl.disable({ emitEvent: false });
      } else {
        ctrl.enable({ emitEvent: false });
      }
    });

    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      ctrl.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((val) => this.on_change.emit(val));
    });
  }

  isSelected(optionValue: any): boolean {
    const currentValue = this.control()?.value;
    if (this.multiple()) {
      return Array.isArray(currentValue) && currentValue.includes(optionValue);
    }
    return currentValue === optionValue;
  }

  selectOption(option: SelectButtonOption): void {
    if (this.is_disabled() || option.disabled) return;

    const ctrl = this.control();
    if (!ctrl) return;

    const currentValue = ctrl.value;

    if (this.multiple()) {
      let newValue: any[] = Array.isArray(currentValue) ? [...currentValue] : [];
      if (newValue.includes(option.value)) {
        newValue = newValue.filter((v) => v !== option.value);
      } else {
        newValue.push(option.value);
      }
      ctrl.setValue(newValue);
      ctrl.markAsDirty();
      ctrl.markAsTouched();
    } else {
      if (currentValue === option.value) {
        // Toggle off if already selected
        ctrl.setValue(null);
      } else {
        ctrl.setValue(option.value);
      }
      ctrl.markAsDirty();
      ctrl.markAsTouched();
    }
  }
}
