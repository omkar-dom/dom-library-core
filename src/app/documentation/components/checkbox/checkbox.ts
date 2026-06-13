import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { DomCheckboxComponent, CheckboxOption } from '../../../shared/controls/lib/dom-input-checkbox/dom-input-checkbox.component';

type Tab = 'component' | 'api' | 'visual-flow';

@Component({
  selector: 'app-checkbox',
  imports: [ReactiveFormsModule, DomCheckboxComponent, JsonPipe],
  templateUrl: './checkbox.html',
  standalone: true,
})
export class Checkbox {
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

  readonly fruit_options: CheckboxOption[] = [
    { id: 'apple',  title: 'Apple'  },
    { id: 'banana', title: 'Banana' },
    { id: 'cherry', title: 'Cherry' },
  ];

  readonly color_options: CheckboxOption[] = [
    { id: 'red',   title: 'Red'   },
    { id: 'green', title: 'Green' },
    { id: 'blue',  title: 'Blue'  },
  ];

  readonly disabled_options: CheckboxOption[] = [
    { id: 'opt1', title: 'Option 1', disabled: true },
    { id: 'opt2', title: 'Option 2', disabled: false },
    { id: 'opt3', title: 'Option 3', disabled: false },
  ];

  // ─── Component tab ───────────────────────────────────────────────────────────

  readonly component_meta = {
    name:     'DomCheckboxComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-checkbox> </dom-checkbox>',
    purpose: [
      `DomCheckboxComponent is a flexible reactive checkbox wrapper for Angular Reactive Forms. ` +
      `It operates in two modes depending on whether an options array is supplied: ` +
      `without options it renders a single boolean checkbox; with options it renders a ` +
      `multi-select checkbox group where the control value is an array of selected IDs.`,

      `The component resolves the FormControl from the parent FormGroup via a computed signal. ` +
      `Checked state is tracked in an internal checked_values signal that is kept in sync with ` +
      `the control value via an effect — so programmatic form patching is reflected in the UI.`,

      `The options layout can be switched between vertical (default) and horizontal by passing ` +
      `layout="horizontal". Each option is rendered as a labelled checkbox. Individual disabling ` +
      `of specific items is handled at the form level. Validation errors are shown by <dom-error> ` +
      `when the control is invalid and touched.`,
    ],
  };

  readonly snippets = {
    import:
`import { DomCheckboxComponent } from 'dom-library-core';`,

    single:
`// TypeScript
// Signal Forms definition
const acceptModel = signal(false);
const form = form(acceptModel, Validators.requiredTrue);

// Template
<dom-checkbox
  [form]="form"
  form_control="accept"
  label="I accept the terms and conditions"
/>`,

    multi_v:
`// options: CheckboxOption[] = [
//   { id: 'apple',  title: 'Apple'  },
//   { id: 'banana', title: 'Banana' },
//   { id: 'cherry', title: 'Cherry' },
// ];
// multi_vertical: [[], Validators.required]

<dom-checkbox
  [form]="form"
  form_control="multi_vertical"
  label="Favourite fruits"
  [options]="fruit_options"
  layout="vertical"
/>`,

    multi_h:
`// color_options: CheckboxOption[] = [
//   { id: 'red',   title: 'Red'   },
//   { id: 'green', title: 'Green' },
//   { id: 'blue',  title: 'Blue'  },
// ];
// multi_horizontal: [[]]

<dom-checkbox
  [form]="form"
  form_control="multi_horizontal"
  label="Preferred colours"
  [options]="color_options"
  layout="horizontal"
/>`,

    disabled:
`// disabled_field: [{ value: ['opt1'], disabled: true }]

<dom-checkbox
  [form]="form"
  form_control="disabled_field"
  label="Options (disabled)"
  [options]="disabled_options"
  [is_disabled]="true"
/>`,

    outputs:
`<dom-checkbox
  [form]="form"
  form_control="categories"
  [options]="category_options"
  (on_change)="handleChange($event)"
  (on_blur)="handleBlur($event)"
/>`,
  };

  readonly variants = {
    single: {
      label:     'Single checkbox (boolean, requiredTrue)',
      badge:     'no options',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Touch and uncheck to trigger the requiredTrue error — the field is only valid when checked.',
    },
    multi_v: {
      label:     'Multi-select — vertical layout, required',
      badge:     'layout="vertical"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'The control value is an array of selected IDs. Touch and deselect all to trigger the required error.',
    },
    multi_h: {
      label:     'Multi-select — horizontal layout',
      badge:     'layout="horizontal"',
      badge_cls: 'bg-purple-50 text-purple-700',
      footer:    null,
    },
    disabled: {
      label:     'Disabled — entire group non-interactive',
      badge:     '[is_disabled]="true"',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
  };

  readonly possible_errors = [
    { validator: 'required',     message: 'This field is required',            example: 'Validators.required (multi-select — array must not be empty)' },
    { validator: 'requiredTrue', message: 'You must accept this to continue',  example: 'Validators.requiredTrue (single checkbox — must be checked)' },
  ];

  readonly api_inputs = [
    {
      name: 'form',
      type: 'FieldTree',
      default_val: 'required',
      description: 'Signal Forms FieldTree proxy node representing the parent form state.'
    },
    { name: 'form_group',    type: 'FormGroup',                    default_val: 'required', description: 'Parent reactive form group (legacy fallback mode).' },
    { name: 'form_control',  type: 'string',                       default_val: 'required', description: 'Key of the control inside the form group.' },
    { name: 'label',         type: 'string',                       default_val: "''",       description: 'Group label displayed above the checkbox options.' },
    { name: 'placeholder',   type: 'string',                       default_val: "''",       description: 'Unused visually; reserved for form schema consistency.' },
    { name: 'hint',          type: 'string',                       default_val: '—',        description: 'Helper text displayed below the group.' },
    { name: 'is_readonly',   type: 'boolean',                      default_val: 'false',    description: 'Marks the group visually as read-only.' },
    { name: 'is_disabled',   type: 'boolean',                      default_val: 'false',    description: 'Disables the control via Angular effect without emitting value changes.' },
    { name: 'options',       type: 'CheckboxOption[]',             default_val: '[]',       description: 'List of checkbox items. When empty, a single boolean checkbox is rendered.' },
    { name: 'id_property',   type: 'string',                       default_val: "'id'",     description: 'Property name used as the checkbox value identifier in options.' },
    { name: 'title_property', type: 'string',                      default_val: "'title'",  description: 'Property name used as the display label for each option.' },
    { name: 'layout',        type: "'vertical' | 'horizontal'",    default_val: "'vertical'", description: 'Controls whether options are stacked vertically or arranged in a row.' },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'any', description: 'Emits boolean (single mode) or string[] of selected IDs (multi mode) on every change.' },
    { name: 'on_blur',   payload: 'any', description: 'Emits the current control value when focus leaves the group.' },
  ];

  readonly internal_notes = [
    { name: 'control',         kind: 'computed<FormControl>',  description: 'Derives the FormControl from the parent FormGroup on every signal change.' },
    { name: 'is_required',     kind: 'computed<boolean>',      description: 'Drives the asterisk next to the label. Checks for Validators.required on the control.' },
    { name: 'checked_values',  kind: 'signal<any[]>',          description: 'Tracks the currently selected IDs in multi-select mode. Initialised from ctrl.value and kept in sync via valueChanges.' },
    { name: 'isChecked(val)',   kind: 'method',                 description: 'Returns true if val is present in checked_values(). Used by the template to set [checked] on each option.' },
    { name: 'toggle(val, evt)', kind: 'method',                 description: 'Adds or removes val from checked_values, then calls control().setValue(current) to update the form.' },
    { name: 'is_disabled effect', kind: 'effect',              description: 'Calls ctrl.disable() or ctrl.enable() with { emitEvent: false } so toggling disabled state never triggers valueChanges.' },
    { name: 'Single-mode render', kind: 'template @if',        description: "When options() is empty, a single <input type='checkbox'> bound directly to [formControl] is rendered." },
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
      accept: [false, Validators.requiredTrue],
    });

    this.variants_form = this.fb.group({
      multi_vertical:   [[], Validators.required],
      multi_horizontal: [[]],
      disabled_field:   [['opt1']],
    });
  }
}
