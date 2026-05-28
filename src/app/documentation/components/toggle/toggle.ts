import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomToggleComponent } from '../../../shared/controls/lib/dom-input-toggle/dom-input-toggle.component';

type Tab = 'component' | 'api' | 'visual-flow';

@Component({
  selector: 'app-toggle',
  imports: [ReactiveFormsModule, DomToggleComponent],
  templateUrl: './toggle.html',
  standalone: true,
})
export class Toggle {
  readonly active_tab = signal<Tab>('component');

  readonly simple_form: FormGroup;
  readonly variants_form: FormGroup;

  private readonly route = inject(ActivatedRoute);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component',   value: 'component' },
    { label: 'API',         value: 'api' },
    { label: 'Visual Flow', value: 'visual-flow' },
  ];

  // ─── Component tab ───────────────────────────────────────────────────────────

  readonly component_meta = {
    name:     'DomToggleComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-toggle> </dom-toggle>',
    purpose: [
      `DomToggleComponent is a reactive boolean toggle (on/off switch) for Angular Reactive Forms. ` +
      `It renders as an accessible button with role="switch" and aria-checked, so screen readers ` +
      `correctly announce its state. The control value is a plain boolean — true when on, false when off.`,

      `Clicking the toggle calls control().setValue(!control().value) inline in the template, ` +
      `keeping the component stateless. The on_label and off_label inputs customise the ` +
      `screen-reader text for each state (defaults: "On" / "Off").`,

      `A required toggle should use Validators.requiredTrue — the field is only valid when ` +
      `the boolean value is true (i.e. the switch is on). Validation errors are rendered by ` +
      `<dom-error> when the control is invalid and touched.`,
    ],
  };

  readonly snippets = {
    import:
`import { DomToggleComponent } from '@app/shared/controls/lib/dom-input-toggle/dom-input-toggle.component';

// or via the public API barrel:
import { DomToggleComponent } from '@app/shared/controls/public-api';`,

    simple:
`// TypeScript
this.simple_form = this.fb.group({
  notifications: [false],
});

// Template
<dom-toggle
  [form_group]="simple_form"
  form_control="notifications"
  label="Email notifications"
/>`,

    required:
`// required_field: [false, Validators.requiredTrue]
// Valid only when value === true (switched on).

<dom-toggle
  [form_group]="form"
  form_control="required_field"
  label="Accept terms (required)"
/>`,

    labels:
`// custom_label_field: [true]

<dom-toggle
  [form_group]="form"
  form_control="custom_label_field"
  label="Dark mode"
  on_label="Enabled"
  off_label="Disabled"
/>`,

    disabled:
`// disabled_field: [false]

<dom-toggle
  [form_group]="form"
  form_control="disabled_field"
  label="Feature flag (disabled)"
  [is_disabled]="true"
/>`,

    outputs:
`<dom-toggle
  [form_group]="form"
  form_control="active"
  (on_change)="handleChange($event)"
  (on_blur)="handleBlur($event)"
/>`,
  };

  readonly variants = {
    simple: {
      label:     'Simple toggle (boolean, no validator)',
      badge:     'boolean value',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Click the switch to toggle. The control value is true when on, false when off.',
    },
    required: {
      label:     'Required — Validators.requiredTrue',
      badge:     'Validators.requiredTrue',
      badge_cls: 'bg-red-50 text-red-700',
      footer:    'Click to turn on, then turn off and blur — the requiredTrue error appears because the value must be true.',
    },
    labels: {
      label:     'Custom on/off labels (screen-reader text)',
      badge:     'on_label / off_label',
      badge_cls: 'bg-purple-50 text-purple-700',
      footer:    'on_label and off_label are read by screen readers via a visually-hidden <span class="sr-only">. They do not appear visually.',
    },
    disabled: {
      label:     'Disabled — non-interactive, value preserved',
      badge:     '[is_disabled]="true"',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
  };

  readonly possible_errors = [
    { validator: 'requiredTrue', message: 'You must accept this to continue', example: 'Validators.requiredTrue — toggle must be switched ON' },
    { validator: 'required',     message: 'This field is required',           example: 'Validators.required — value must be truthy (avoid; prefer requiredTrue)' },
  ];

  readonly api_inputs = [
    { name: 'form_group',   type: 'FormGroup', default_val: 'required', description: 'Parent reactive form group that owns the control.' },
    { name: 'form_control', type: 'string',    default_val: 'required', description: 'Key of the control inside the form group.' },
    { name: 'label',        type: 'string',    default_val: "''",       description: 'Label displayed above the toggle switch.' },
    { name: 'placeholder',  type: 'string',    default_val: "''",       description: 'Unused visually; reserved for form schema consistency.' },
    { name: 'hint',         type: 'string',    default_val: '—',        description: 'Helper text displayed below the toggle.' },
    { name: 'is_readonly',  type: 'boolean',   default_val: 'false',    description: 'Marks the toggle visually as read-only.' },
    { name: 'is_disabled',  type: 'boolean',   default_val: 'false',    description: 'Disables the toggle via Angular effect without emitting value changes.' },
    { name: 'on_label',     type: 'string',    default_val: "'On'",     description: "Screen-reader text announced when the toggle value is true." },
    { name: 'off_label',    type: 'string',    default_val: "'Off'",    description: "Screen-reader text announced when the toggle value is false." },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'boolean', description: 'Emits the new boolean value via valueChanges on every click.' },
    { name: 'on_blur',   payload: 'boolean', description: 'Emits the current boolean value when the toggle button loses focus.' },
  ];

  readonly internal_notes = [
    { name: 'control',           kind: 'computed<FormControl>',  description: 'Derives the FormControl from the parent FormGroup on every signal change.' },
    { name: 'is_required',       kind: 'computed<boolean>',      description: 'Drives the asterisk next to the label. Checks Validators.required on the control.' },
    { name: 'is_disabled effect', kind: 'effect',               description: 'Calls ctrl.disable() or ctrl.enable() with { emitEvent: false }.' },
    { name: 'setValue call',     kind: 'template binding',       description: '(click) calls control().setValue(!control().value) directly in the template — no intermediate method needed.' },
    { name: 'markAsTouched',     kind: 'template binding',       description: '(click) also calls control().markAsTouched() so validation errors appear immediately after the first interaction.' },
    { name: 'role="switch"',     kind: 'ARIA attribute',         description: 'The button has role="switch" and [attr.aria-checked] bound to control().value for full screen-reader accessibility.' },
    { name: 'sr-only span',      kind: 'template element',       description: 'A visually hidden <span> renders on_label or off_label for screen readers while the knob animation communicates state visually.' },
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
      notifications: [false],
    });

    this.variants_form = this.fb.group({
      required_field:     [false, Validators.requiredTrue],
      custom_label_field: [true],
      disabled_field:     [false],
    });
  }
}
