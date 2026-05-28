import {
  Component,
  input,
  output,
  computed,
  inject,
  DestroyRef,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomErrorComponent } from '../dom-error/dom-error.component';

export interface CountryCodeOption {
  id: string;
  title: string;
  code: string;
  flag: string;
  min?: number;
  max?: number;
}

@Component({
  selector: 'dom-mobile-number',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DomErrorComponent],
  templateUrl: './dom-mobile-number.component.html',
  styleUrl: './dom-mobile-number.component.css',
})
export class DomMobileNumberComponent {
  readonly form_group = input.required<FormGroup>();
  readonly form_control = input.required<string>();
  readonly label = input<string>('');
  readonly placeholder = input<string>('Enter phone number');
  readonly hint = input<string>('');
  readonly is_disabled = input<boolean>(false);
  readonly default_country = input<string>('US');

  readonly custom_countries = input<CountryCodeOption[]>([]);

  readonly on_change = output<string>();

  // Upgraded country dial list with id, title, and min/max digit constraints
  readonly default_countries: CountryCodeOption[] = [
    { id: 'us', title: 'United States', code: '+1', flag: '🇺🇸', min: 10, max: 10 },
    { id: 'in', title: 'India', code: '+91', flag: '🇮🇳', min: 10, max: 10 },
    { id: 'gb', title: 'United Kingdom', code: '+44', flag: '🇬🇧', min: 10, max: 10 },
    { id: 'es', title: 'Spain', code: '+34', flag: '🇪🇸', min: 9, max: 9 },
    { id: 'ca', title: 'Canada', code: '+1', flag: '🇨🇦', min: 10, max: 10 },
    { id: 'au', title: 'Australia', code: '+61', flag: '🇦🇺', min: 9, max: 9 },
  ];

  readonly countries = computed<CountryCodeOption[]>(() => {
    return this.custom_countries().length > 0 ? this.custom_countries() : this.default_countries;
  });

  readonly selected_country = signal<CountryCodeOption>({
    id: 'us',
    title: 'United States',
    code: '+1',
    flag: '🇺🇸',
    min: 10,
    max: 10,
  });
  readonly local_number = signal<string>('');

  readonly control = computed<FormControl>(
    () => this.form_group().get(this.form_control()) as FormControl,
  );

  private is_required_original = false;
  private readonly destroyRef = inject(DestroyRef);

  readonly is_required = computed(() => {
    const ctrl = this.control();
    return ctrl ? ctrl.hasValidator(Validators.required) : false;
  });

  constructor() {
    // Preserve the original required validator state
    effect(() => {
      const ctrl = this.control();
      if (ctrl && !this.is_required_original) {
        this.is_required_original = ctrl.hasValidator(Validators.required);
      }
    });

    // Sync default country when input arrives
    effect(() => {
      const def = this.default_country().toLowerCase();
      const matched = this.countries().find((c) => c.id === def);
      if (matched) {
        this.selected_country.set(matched);
      }
    });

    // Handle disables
    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      if (this.is_disabled()) {
        ctrl.disable({ emitEvent: false });
      } else {
        ctrl.enable({ emitEvent: false });
      }
    });

    // Populate initial value from FormControl if pre-filled
    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      const initialValue = ctrl.value;
      if (initialValue) {
        const parsed = this.parsePhoneNumber(initialValue);
        this.selected_country.set(parsed.country);
        this.local_number.set(parsed.number);
      }
    });

    // Sync input events back to the parent Reactive Form Control
    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;

      const code = this.selected_country().code;
      const num = this.local_number().trim();
      const combinedValue = num ? `${code}${num}` : '';

      if (ctrl.value !== combinedValue) {
        ctrl.setValue(combinedValue, { emitEvent: false });
        ctrl.markAsDirty();
        this.on_change.emit(combinedValue);
      }
    });

    // Dynamic Validation Effect based on the selected country's min/max bounds
    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      const country = this.selected_country();

      ctrl.clearValidators();

      const newValidators = [];
      if (this.is_required_original) {
        newValidators.push(Validators.required);
      }

      if (country.min) {
        newValidators.push((c: any) => {
          if (!c.value) return null;
          const national = c.value.substring(country.code.length).replace(/[^\d]/g, '');
          if (national && national.length < country.min!) {
            return { minlength: { requiredLength: country.min, actualLength: national.length } };
          }
          return null;
        });
      }

      if (country.max) {
        newValidators.push((c: any) => {
          if (!c.value) return null;
          const national = c.value.substring(country.code.length).replace(/[^\d]/g, '');
          if (national && national.length > country.max!) {
            return { maxlength: { requiredLength: country.max, actualLength: national.length } };
          }
          return null;
        });
      }

      ctrl.setValidators(newValidators);
      ctrl.updateValueAndValidity({ emitEvent: false });
    });
  }

  private parsePhoneNumber(value: string): { country: CountryCodeOption; number: string } {
    const sorted = [...this.countries()].sort((a, b) => b.code.length - a.code.length);
    for (const c of sorted) {
      if (value.startsWith(c.code)) {
        return { country: c, number: value.substring(c.code.length) };
      }
    }
    return { country: this.selected_country(), number: value };
  }

  onCountryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value; // string format code:id
    const [code, id] = value.split(':');
    const matched = this.countries().find((c) => c.code === code && c.id === id);
    if (matched) {
      this.selected_country.set(matched);
      this.control()?.markAsTouched();
    }
  }

  onNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/[^\d\-\s]/g, '');
    this.local_number.set(val);
    this.control()?.markAsTouched();
  }
}
