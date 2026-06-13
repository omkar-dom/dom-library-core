import {
  Component,
  input,
  output,
  computed,
  signal,
  effect,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { resolveFormField, FormModel } from '../form-control.utils';

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
export class DomMobileNumberComponent<T extends FormModel = FormModel> {
  readonly form = input<any>();
  readonly form_group = input<FormGroup>();
  readonly form_control = input.required<Extract<keyof T, string>>();
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
    // Sync default country when input arrives
    effect(() => {
      const def = this.default_country().toLowerCase();
      const matched = this.countries().find((c) => c.id === def);
      if (matched) {
        this.selected_country.set(matched);
      }
    });

    // Populate initial value from Field signal or legacyControl if pre-filled
    effect(() => {
      const f = this.field();
      const ctrl = this.legacyControl();
      const val = f ? f.value() : (ctrl ? ctrl.value : undefined);
      if (val) {
        const parsed = this.parsePhoneNumber(val as string);
        untracked(() => {
          this.selected_country.set(parsed.country);
          this.local_number.set(parsed.number);
        });
      }
    });

    // Sync input events back to the parent Form Control / Field signal
    effect(() => {
      const code = this.selected_country().code;
      const num = this.local_number().trim();
      const combinedValue = num ? `${code}${num}` : '';
      
      const f = this.field();
      if (f) {
        const currentVal = f.value();
        if (currentVal !== combinedValue) {
          untracked(() => {
            f.value.set(combinedValue as any);
            f.markAsDirty();
            this.on_change.emit(combinedValue);
          });
        }
      } else {
        const ctrl = this.legacyControl();
        if (ctrl) {
          const currentVal = ctrl.value;
          if (currentVal !== combinedValue) {
            untracked(() => {
              ctrl.setValue(combinedValue);
              ctrl.markAsDirty();
              this.on_change.emit(combinedValue);
            });
          }
        }
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
      const f = this.field();
      if (f) {
        f.markAsTouched();
      } else {
        this.legacyControl()?.markAsTouched();
      }
    }
  }

  onNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/[^\d\-\s]/g, '');
    this.local_number.set(val);
    const f = this.field();
    if (f) {
      f.markAsTouched();
    } else {
      this.legacyControl()?.markAsTouched();
    }
  }
}
