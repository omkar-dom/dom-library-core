import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomMobileNumberComponent } from '../../../shared/controls/public-api';

type Tab = 'component' | 'api';

@Component({
  selector: 'app-showcase-mobile-number',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DomMobileNumberComponent],
  templateUrl: './mobile-number.html',
})
export class MobileNumberShowcase {
  readonly active_tab = signal<Tab>('component');

  readonly form: FormGroup;
  private readonly fb = inject(FormBuilder);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
  ];

  readonly custom_list = [
    { id: 'in', title: 'India', code: '+91', flag: '🇮🇳', min: 10, max: 10 },
    { id: 'gb', title: 'United Kingdom', code: '+44', flag: '🇬🇧', min: 10, max: 10 },
  ];

  readonly component_meta = {
    name: 'DomMobileNumberComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-mobile-number> </dom-mobile-number>',
    purpose: [
      `DomMobileNumberComponent provides a highly polished international phone number input.`,
      `It features dynamic country dial code dropdown integration, reactive pre-filling support (parses values e.g. +919876543210 automatically), customizable country list options, and strict Reactive Forms validation syncing.`
    ],
  };

  readonly snippets = {
    import: `import { DomMobileNumberComponent } from 'dom-library';`,
    usage: `// TypeScript Form Initialization
this.form = this.fb.group({
  phone: ['+919876543210', [Validators.required, Validators.minLength(8)]],
});

// HTML Default Usage
<dom-mobile-number
  [form_group]="form"
  form_control="phone"
  label="Phone Number"
  default_country="IN"
/>`,
    custom: `<!-- Customized dial list option -->
<dom-mobile-number
  [form_group]="form"
  form_control="phone"
  [custom_countries]="custom_list"
  label="Office Hotlines"
/>`
  };

  readonly api_inputs = [
    { name: 'form_group', type: 'FormGroup', default_val: 'required', description: 'Parent Reactive Form group containing the control.' },
    { name: 'form_control', type: 'string', default_val: 'required', description: 'Form Control string key.' },
    { name: 'label', type: 'string', default_val: "''", description: 'Field header label text.' },
    { name: 'placeholder', type: 'string', default_val: "'Enter phone number'", description: 'Placeholder shown inside national text input.' },
    { name: 'hint', type: 'string', default_val: "''", description: 'Helper text displayed below input.' },
    { name: 'default_country', type: 'string', default_val: "'US'", description: 'Pre-selects matching code upon component boot.' },
    { name: 'custom_countries', type: 'CountryCodeOption[]', default_val: '[]', description: 'Custom array of countries: code, country, flag.' },
    { name: 'is_disabled', type: 'boolean', default_val: 'false', description: 'Disables dropdown and number input elements.' }
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'string', description: 'Fires when number changes, emitting the concatenated full dial string.' }
  ];

  constructor() {
    this.form = this.fb.group({
      phone_default: ['+919876543210', Validators.required],
      phone_custom: ['', Validators.required],
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    console.log(this.form.value);
  }

  reset(): void {
    this.form.reset({
      phone_default: '',
      phone_custom: '',
    });
  }
}
