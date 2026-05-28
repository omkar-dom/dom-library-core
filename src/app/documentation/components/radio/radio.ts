import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomRadioComponent, RadioOption } from '../../../shared/controls/lib/dom-radio/dom-radio.component';

type Tab = 'component' | 'api' | 'visual-flow';

@Component({
  selector: 'app-radio',
  imports: [ReactiveFormsModule, DomRadioComponent],
  templateUrl: './radio.html',
  standalone: true,
})
export class Radio {
  readonly active_tab = signal<Tab>('component');

  readonly simple_form: FormGroup;
  readonly variants_form: FormGroup;

  private readonly route = inject(ActivatedRoute);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component',   value: 'component' },
    { label: 'API',         value: 'api' },
    { label: 'Visual Flow', value: 'visual-flow' },
  ];

  // ─── Option data for live demos ──────────────────────────────────────────────

  readonly priority_options: RadioOption[] = [
    { label: 'Low',    value: 'low'    },
    { label: 'Medium', value: 'medium' },
    { label: 'High',   value: 'high'   },
  ];

  readonly size_options: RadioOption[] = [
    { label: 'Small',  value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large',  value: 'lg' },
  ];

  readonly status_options: RadioOption[] = [
    { label: 'Active',   value: 'active'   },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending',  value: 'pending', disabled: true },
  ];

  readonly hint_options: RadioOption[] = [
    { label: 'Monthly',  value: 'monthly'  },
    { label: 'Annually', value: 'annually' },
  ];

  // ─── Component tab ───────────────────────────────────────────────────────────

  readonly component_meta = {
    name:     'DomRadioComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-radio> </dom-radio>',
    purpose: [
      `DomRadioComponent is a reactive radio button group for Angular Reactive Forms. ` +
      `It renders a set of mutually-exclusive options defined by a RadioOption[] array, ` +
      `each with a label, value, and an optional disabled flag. The control value is the ` +
      `value property of the selected option.`,

      `Options are bound with [formControl] on each individual radio input using [value] binding, ` +
      `so Angular's reactive forms engine handles the selection state natively. Individual options ` +
      `can be disabled via opt.disabled without disabling the entire group.`,

      `The layout can be switched between vertical (default, stacked) and horizontal (inline row) ` +
      `by setting layout="horizontal". A hint line and inline <dom-error> validation messages are ` +
      `supported in the same way as all other controls in this library.`,
    ],
  };

  readonly snippets = {
    import:
`import { DomRadioComponent } from '@app/shared/controls/lib/dom-radio/dom-radio.component';
import type { RadioOption } from '@app/shared/controls/lib/dom-radio/dom-radio.component';

// or via the public API barrel:
import { DomRadioComponent } from '@app/shared/controls/public-api';`,

    simple:
`// TypeScript
readonly priority_options: RadioOption[] = [
  { label: 'Low',    value: 'low'    },
  { label: 'Medium', value: 'medium' },
  { label: 'High',   value: 'high'   },
];
this.simple_form = this.fb.group({
  priority: [null, Validators.required],
});

// Template
<dom-radio
  [form_group]="simple_form"
  form_control="priority"
  label="Priority"
  [options]="priority_options"
/>`,

    horizontal:
`// size_options: RadioOption[] = [
//   { label: 'Small',  value: 'sm' },
//   { label: 'Medium', value: 'md' },
//   { label: 'Large',  value: 'lg' },
// ];
// horizontal_field: [null]

<dom-radio
  [form_group]="form"
  form_control="horizontal_field"
  label="Size"
  [options]="size_options"
  layout="horizontal"
/>`,

    disabled_opt:
`// status_options: RadioOption[] = [
//   { label: 'Active',   value: 'active'   },
//   { label: 'Inactive', value: 'inactive' },
//   { label: 'Pending',  value: 'pending', disabled: true },  // <-- individual
// ];
// disabled_opt_field: [null, Validators.required]

<dom-radio
  [form_group]="form"
  form_control="disabled_opt_field"
  label="Status"
  [options]="status_options"
/>`,

    hint:
`// hint_options: RadioOption[] = [
//   { label: 'Monthly',  value: 'monthly'  },
//   { label: 'Annually', value: 'annually' },
// ];
// hint_field: [null]

<dom-radio
  [form_group]="form"
  form_control="hint_field"
  label="Billing cycle"
  hint="Annual billing saves 20%"
  [options]="hint_options"
  layout="horizontal"
/>`,

    outputs:
`<dom-radio
  [form_group]="form"
  form_control="category"
  [options]="category_options"
  (on_change)="handleChange($event)"
  (on_blur)="handleBlur($event)"
/>`,
  };

  readonly variants = {
    simple: {
      label:     'Vertical layout, required',
      badge:     'layout="vertical"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Touch and blur without selecting to trigger the required error. Only one option can be selected at a time.',
    },
    horizontal: {
      label:     'Horizontal layout — options in a row',
      badge:     'layout="horizontal"',
      badge_cls: 'bg-purple-50 text-purple-700',
      footer:    null,
    },
    disabled_opt: {
      label:     'Individual disabled option — Pending is non-selectable',
      badge:     'opt.disabled = true',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    'Only the option with disabled: true in the RadioOption is greyed out. The rest of the group remains interactive.',
    },
    hint: {
      label:     'With hint — helper text below the group',
      badge:     'hint="..."',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
  };

  readonly possible_errors = [
    { validator: 'required', message: 'This field is required', example: 'Validators.required — no option selected' },
    { validator: 'pattern',  message: 'Invalid format',         example: 'Validators.pattern(...) — if values must match a format' },
  ];

  readonly api_inputs = [
    { name: 'form_group',   type: 'FormGroup',                 default_val: 'required',   description: 'Parent reactive form group that owns the control.' },
    { name: 'form_control', type: 'string',                    default_val: 'required',   description: 'Key of the control inside the form group.' },
    { name: 'label',        type: 'string',                    default_val: "''",         description: 'Group label displayed above the radio options.' },
    { name: 'placeholder',  type: 'string',                    default_val: "''",         description: 'Unused visually; reserved for form schema consistency.' },
    { name: 'hint',         type: 'string',                    default_val: '—',          description: 'Helper text displayed below the option list.' },
    { name: 'is_readonly',  type: 'boolean',                   default_val: 'false',      description: 'Marks the group visually as read-only.' },
    { name: 'is_disabled',  type: 'boolean',                   default_val: 'false',      description: 'Disables the entire control via Angular effect without emitting value changes.' },
    { name: 'options',      type: 'RadioOption[]',             default_val: '[]',         description: 'Array of { label, value, disabled? } objects defining the radio buttons to render.' },
    { name: 'layout',       type: "'vertical' | 'horizontal'", default_val: "'vertical'", description: 'Stacks options vertically (default) or arranges them in an inline row.' },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'any', description: 'Emits the selected option value via valueChanges on each selection change.' },
    { name: 'on_blur',   payload: 'any', description: 'Emits the current control value when any radio input loses focus.' },
  ];

  readonly internal_notes = [
    { name: 'control',           kind: 'computed<FormControl>',  description: 'Derives the FormControl from the parent FormGroup on every signal change.' },
    { name: 'is_required',       kind: 'computed<boolean>',      description: 'Drives the asterisk next to the label. Checks Validators.required on the control.' },
    { name: 'is_disabled effect', kind: 'effect',               description: 'Calls ctrl.disable() or ctrl.enable() with { emitEvent: false }.' },
    { name: '[formControl] per option', kind: 'template binding', description: 'Each radio <input> shares the same [formControl] binding. Angular handles mutual exclusion natively — no manual deselection code needed.' },
    { name: '[value] binding',   kind: 'template binding',       description: '[value]="opt.value" tells Angular which form value to set when that radio is selected.' },
    { name: 'opt.disabled',      kind: 'RadioOption property',   description: '[disabled]="opt.disabled ?? false" on individual inputs allows greying out specific options without disabling the whole group.' },
    { name: 'layout @if',        kind: 'template binding',       description: '[class] applies flex-col or flex-row on the wrapper based on layout() to switch between vertical and horizontal rendering.' },
  ];

  constructor(private readonly fb: FormBuilder) {
    this.route.fragment.subscribe(fragment => {
      if (!fragment) return;
      this.active_tab.set('component');
      setTimeout(() => {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });

    this.simple_form = this.fb.group({
      priority: [null, Validators.required],
    });

    this.variants_form = this.fb.group({
      horizontal_field:    [null],
      disabled_opt_field:  [null, Validators.required],
      hint_field:          [null],
    });
  }
}
