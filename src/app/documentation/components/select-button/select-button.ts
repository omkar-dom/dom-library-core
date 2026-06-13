import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSelectButtonComponent } from '../../../shared/controls/public-api';

type Tab = 'component' | 'api';

@Component({
  selector: 'app-showcase-select-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DomSelectButtonComponent],
  templateUrl: './select-button.html',
})
export class SelectButtonShowcase {
  readonly active_tab = signal<Tab>('component');

  readonly form: FormGroup;
  private readonly fb = inject(FormBuilder);

  readonly speed_options = [
    { label: 'Low', value: 'low', icon: 'fa-solid fa-gauge-simple' },
    { label: 'Medium', value: 'medium', icon: 'fa-solid fa-gauge' },
    { label: 'High', value: 'high', icon: 'fa-solid fa-gauge-high' },
  ];

  readonly device_options = [
    { label: 'Laptop', value: 'laptop', icon: 'fa-solid fa-laptop' },
    { label: 'Mobile', value: 'mobile', icon: 'fa-solid fa-mobile-screen' },
    { label: 'Tablet', value: 'tablet', icon: 'fa-solid fa-tablet-screen-button', disabled: true },
    { label: 'Watch', value: 'watch', icon: 'fa-solid fa-clock' },
  ];

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
  ];

  readonly component_meta = {
    name: 'DomSelectButtonComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-select-button> </dom-select-button>',
    purpose: [
      `DomSelectButtonComponent is a sleek segmented choice control that replaces traditional radio buttons or multi-select dropdowns.`,
      `It implements full ControlValueAccessor functionality for zero-overhead Reactive Forms integration, displays FontAwesome icons, supports multi-option toggles, disabled states, and dynamic form validation error rendering.`
    ],
  };

  readonly snippets = {
    import: `import { DomSelectButtonComponent } from 'dom-library';`,
    single: `// TypeScript Single Select
this.form = this.fb.group({
  speed: ['medium', Validators.required],
});

// HTML Single Select
<dom-select-button
  [form]="form"
  form_control="speed"
  [options]="speed_options"
  label="Processing Speed"
/>`,
    multi: `// TypeScript Multi Select
this.form = this.fb.group({
  devices: [['laptop', 'mobile'], Validators.required],
});

// HTML Multi Select
<dom-select-button
  [form]="form"
  form_control="devices"
  [options]="device_options"
  [multiple]="true"
  label="Target Devices"
/>`
  };

  readonly api_inputs = [
    {
      name: 'form',
      type: 'FieldTree',
      default_val: 'required',
      description: 'Signal Forms FieldTree proxy node representing the parent form state.'
    },
    { name: 'form_group', type: 'FormGroup', default_val: 'required', description: 'Parent form group containing the control key.' },
    { name: 'form_control', type: 'string', default_val: 'required', description: 'String key identifier matching form control.' },
    { name: 'options', type: 'SelectButtonOption[]', default_val: 'required', description: 'List of button choices: label, value, icon, disabled.' },
    { name: 'multiple', type: 'boolean', default_val: 'false', description: 'Allows selecting multiple values concurrently.' },
    { name: 'label', type: 'string', default_val: "''", description: 'Field header label text.' },
    { name: 'hint', type: 'string', default_val: "''", description: 'Field support note text.' },
    { name: 'is_disabled', type: 'boolean', default_val: 'false', description: 'Disables user interactions and selection toggles.' }
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'any', description: 'Fires when control changes state, emitting selected values.' }
  ];

  constructor() {
    this.form = this.fb.group({
      speed: ['', Validators.required],
      devices: [[], Validators.required],
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    console.log(this.form.value);
  }

  reset(): void {
    this.form.reset({
      speed: '',
      devices: [],
    });
  }
}
