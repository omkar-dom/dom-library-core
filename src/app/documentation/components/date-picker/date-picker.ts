import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomDatePickerComponent } from '../../../shared/controls/lib/dom-input-date/dom-input-date';
import { domDateMin, domDateMax } from '../../../shared/controls/lib/date-format.util';

type Tab = 'component' | 'api' | 'visual-flow';

@Component({
  selector: 'app-date-picker',
  imports: [ReactiveFormsModule, DomDatePickerComponent],
  templateUrl: './date-picker.html',
  standalone: true,
})
export class DatePicker {
  readonly active_tab = signal<Tab>('component');

  readonly simple_form: FormGroup;
  readonly variants_form: FormGroup;

  private readonly route = inject(ActivatedRoute);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component',   value: 'component' },
    { label: 'API',         value: 'api' },
    { label: 'Visual Flow', value: 'visual-flow' },
  ];

  readonly component_meta = {
    name:     'DomDatePickerComponent',
    tag_line: 'Angular standalone component · OnPush · Angular Material datepicker',
    selector: '<dom-date-picker> </dom-date-picker>',
    purpose: [
      `DomDatePickerComponent wraps Angular Material's MatDatepicker to provide a reactive-forms-compatible ` +
      `date picker. The control stores dates as strings in one of three formats selected via the format input: ` +
      `"iso" (YYYY-MM-DD, default), "timestamp" (Unix ms as string), or "custom" (any Moment.js pattern ` +
      `supplied via custom_format).`,

      `Internally the component maintains two representations: a pickerDate signal (JavaScript Date) displayed ` +
      `in the MatDatepicker, and a formatted string stored in the FormControl. Conversion between them is handled ` +
      `by the date-format.util helpers (formatForValue, parseToDate). An effect syncs the pickerDate whenever ` +
      `the control value changes programmatically (e.g. form.patchValue).`,

      `Date range constraints are expressed as reactive-forms validators using domDateMin / domDateMax from the ` +
      `same utility. These validators attach metadata (domDateMin / domDateMax properties) to their functions ` +
      `so the component's dateBounds computed signal can read them and pass real Date objects to MatDatepicker's ` +
      `[min] / [max] bindings, disabling out-of-range dates in the calendar UI.`,
    ],
  };

  readonly snippets = {
    import:
`import { DomDatePickerComponent } from '@app/shared/controls/lib/dom-input-date/dom-input-date';
import { domDateMin, domDateMax } from '@app/shared/controls/lib/date-format.util';

// or via the public API barrel:
import { DomDatePickerComponent, domDateMin, domDateMax } from '@app/shared/controls/public-api';`,

    simple:
`// TypeScript
this.simple_form = this.fb.group({
  birthday: [null, Validators.required],
});

// Template
<dom-date-picker
  [form_group]="simple_form"
  form_control="birthday"
  label="Date of birth"
  placeholder="Select date"
/>`,

    timestamp:
`// timestamp_field: [null]

<dom-date-picker
  [form_group]="form"
  form_control="timestamp_field"
  label="Event date (Unix timestamp)"
  format="timestamp"
/>
<!-- stored value: "1735689600000" -->`,

    minmax:
`// domDateMin / domDateMax read bounds from the validator metadata
// and pass them to [min] / [max] on the Material datepicker.
// minmax_field: [null, [Validators.required, domDateMin('2024-01-01'), domDateMax('2024-12-31')]]

<dom-date-picker
  [form_group]="form"
  form_control="minmax_field"
  label="Event date"
  hint="Must be in 2024"
/>`,

    disabled:
`// disabled_field: ['2024-06-15']   (pre-filled ISO date)

<dom-date-picker
  [form_group]="form"
  form_control="disabled_field"
  label="Contract start (read-only)"
  [is_disabled]="true"
/>`,

    outputs:
`<dom-date-picker
  [form_group]="form"
  form_control="start_date"
  (on_change)="handleChange($event)"  <!-- emits formatted string | null -->
  (on_blur)="handleBlur($event)"
/>`,
  };

  readonly variants = {
    simple: {
      label:     '5a — Simple date picker, required, ISO format',
      badge:     'format="iso"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Click the calendar icon or the input to open the picker. The stored value is "YYYY-MM-DD".',
    },
    timestamp: {
      label:     'Unix timestamp format',
      badge:     'format="timestamp"',
      badge_cls: 'bg-amber-50 text-amber-700',
      footer:    'The stored value is a Unix millisecond timestamp as a string (e.g. "1735689600000").',
    },
    minmax: {
      label:     'Date bounds — domDateMin / domDateMax validators',
      badge:     'domDateMin · domDateMax',
      badge_cls: 'bg-purple-50 text-purple-700',
      footer:    'The calendar greys out dates outside the validator range. domDateMin / domDateMax also produce form errors when the value is out of range.',
    },
    disabled: {
      label:     'Disabled — pre-filled, calendar locked',
      badge:     '[is_disabled]="true"',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
  };

  readonly possible_errors = [
    { validator: 'required',    message: 'This field is required', example: 'Validators.required — no date selected' },
    { validator: 'domDateMin',   message: 'Date must not be before {min}', example: 'domDateMin("2024-01-01") — selected date is earlier than the minimum' },
    { validator: 'domDateMax',   message: 'Date must not be after {max}', example: 'domDateMax("2024-12-31") — selected date is later than the maximum' },
  ];

  readonly api_inputs = [
    { name: 'form_group',     type: 'FormGroup',       default_val: 'required',    description: 'Parent reactive form group.' },
    { name: 'form_control',   type: 'string',          default_val: 'required',    description: 'Key of the control inside the form group.' },
    { name: 'label',          type: 'string',          default_val: "''",          description: 'Field label above the picker.' },
    { name: 'placeholder',    type: 'string',          default_val: "''",          description: 'Placeholder shown when no date is selected.' },
    { name: 'hint',           type: 'string',          default_val: '—',           description: 'Helper text below the field.' },
    { name: 'is_readonly',    type: 'boolean',         default_val: 'false',       description: 'Prevents the calendar from opening while keeping the control enabled.' },
    { name: 'is_disabled',    type: 'boolean',         default_val: 'false',       description: 'Disables the control via Angular effect.' },
    { name: 'format',         type: "DateValueFormat", default_val: "'iso'",       description: '"iso" → YYYY-MM-DD; "timestamp" → Unix ms string; "custom" → custom_format pattern.' },
    { name: 'custom_format',  type: 'string',          default_val: '—',           description: 'Moment.js format string used when format="custom" (e.g. "DD/MM/YYYY").' },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'string | null', description: 'Emits the formatted date string (or null) whenever a date is selected or cleared.' },
    { name: 'on_blur',   payload: 'string | null', description: 'Emits the current control value when the picker input loses focus.' },
  ];

  readonly internal_notes = [
    { name: 'pickerDate',    kind: 'signal<Date | null>', description: 'JavaScript Date used by the MatDatepicker. Synced with control value via an effect.' },
    { name: 'dateBounds',    kind: 'computed<{ min, max }>', description: 'Reads domDateMin / domDateMax metadata from control validators and converts them to Date objects for the Material calendar.' },
    { name: 'onDateChange',  kind: 'method', description: 'Called by (dateChange) on the matInput. Formats the Date using formatForValue and calls control().setValue().' },
    { name: 'openDatePicker', kind: 'method', description: 'Opens the MatDatepicker — blocked when is_disabled or is_readonly to prevent the calendar from appearing.' },
    { name: 'formatForValue', kind: 'utility fn (date-format.util)', description: 'Converts a Date to the chosen format string. Used in onDateChange before writing to the control.' },
    { name: 'parseToDate',   kind: 'utility fn (date-format.util)', description: 'Parses the control string value back to a Date for the picker — handles iso, timestamp, and custom formats.' },
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
      birthday: [null, Validators.required],
    });

    this.variants_form = this.fb.group({
      timestamp_field: [null],
      minmax_field:    [null, [Validators.required, domDateMin('2024-01-01'), domDateMax('2024-12-31')]],
      disabled_field:  ['2024-06-15'],
    });
  }
}
