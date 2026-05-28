import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomDateTimePickerComponent } from '../../../shared/controls/lib/dom-input-date-time/dom-input-date-time';
import { domDateMin, domDateMax } from '../../../shared/controls/lib/date-format.util';

type Tab = 'component' | 'api' | 'visual-flow';

@Component({
  selector: 'app-datetime-picker',
  imports: [ReactiveFormsModule, DomDateTimePickerComponent],
  templateUrl: './datetime-picker.html',
  standalone: true,
})
export class DateTimePicker {
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
    name:     'DomDateTimePickerComponent',
    tag_line: 'Angular standalone component · OnPush · Material datepicker + native time input',
    selector: '<dom-datetime-picker> </dom-datetime-picker>',
    purpose: [
      `DomDateTimePickerComponent combines a Material date calendar with a native <input type="time"> ` +
      `inside a single MatFormField. The control stores a combined date-and-time string in the chosen ` +
      `format — "iso" produces "YYYY-MM-DD HH:mm", "timestamp" stores Unix milliseconds, and "custom" ` +
      `uses any Moment.js pattern supplied via custom_format.`,

      `Internally the component maintains two signals — pickerDate (JavaScript Date for the calendar) and ` +
      `pickerTime (HH:mm string for the time input). When either changes, mergeDateAndTime combines them ` +
      `into a single Date and passes it through formatForValue before writing to the FormControl. This means ` +
      `the control always holds one consistent string value that encodes both date and time.`,

      `Date range bounds work identically to DomDatePickerComponent — domDateMin and domDateMax validators are ` +
      `read from the control's validator list and passed to the Material calendar's [min] / [max] bindings ` +
      `to grey out invalid dates. The time input is independently disabled/readonly via the is_disabled and ` +
      `is_readonly inputs, keeping both fields locked together.`,
    ],
  };

  readonly snippets = {
    import:
`import { DomDateTimePickerComponent, domDateMin, domDateMax } from 'dom-library-core';`,

    simple:
`// TypeScript
this.simple_form = this.fb.group({
  appointment: [null, Validators.required],
});

// Template
<dom-datetime-picker
  [form_group]="simple_form"
  form_control="appointment"
  label="Appointment date & time"
  placeholder="Select date"
/>
<!-- stored value: "2025-06-15 14:30" (ISO format) -->`,

    readonly_ex:
`// readonly_field: ['2025-01-15 09:30']

<dom-datetime-picker
  [form_group]="form"
  form_control="readonly_field"
  label="Scheduled at (read-only)"
  [is_readonly]="true"
/>`,

    minmax:
`// The calendar greys out dates outside the range.
// minmax_field: [null, [
//   Validators.required,
//   domDateMin('2025-01-01 00:00', { isDateTime: true }),
//   domDateMax('2025-12-31 23:59', { isDateTime: true }),
// ]]

<dom-datetime-picker
  [form_group]="form"
  form_control="minmax_field"
  label="Schedule within 2025"
  hint="Pick any slot in the current year"
/>`,

    outputs:
`<dom-datetime-picker
  [form_group]="form"
  form_control="appointment"
  (on_change)="handleChange($event)"  <!-- emits "YYYY-MM-DD HH:mm" or null -->
  (on_blur)="handleBlur($event)"
/>`,
  };

  readonly variants = {
    simple: {
      label:     '5a — Simple datetime picker, required, ISO format',
      badge:     'format="iso"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Select a date via the calendar, then adjust the time using the time input. The stored value is "YYYY-MM-DD HH:mm".',
    },
    readonly_ex: {
      label:     'Read-only — calendar locked, time input locked',
      badge:     '[is_readonly]="true"',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    'Both the date and time inputs are locked. The value is visible but not editable.',
    },
    minmax: {
      label:     'Date bounds — domDateMin / domDateMax for datetime',
      badge:     'domDateMin · domDateMax · isDateTime',
      badge_cls: 'bg-purple-50 text-purple-700',
      footer:    'Pass { isDateTime: true } to the validator options so bounds are compared including the time component.',
    },
  };

  readonly possible_errors = [
    { validator: 'required',  message: 'This field is required',          example: 'Validators.required — no date/time selected' },
    { validator: 'domDateMin', message: 'Date must not be before {min}',   example: 'domDateMin("2025-01-01 00:00", { isDateTime: true })' },
    { validator: 'domDateMax', message: 'Date must not be after {max}',    example: 'domDateMax("2025-12-31 23:59", { isDateTime: true })' },
  ];

  readonly api_inputs = [
    { name: 'form_group',    type: 'FormGroup',      default_val: 'required',  description: 'Parent reactive form group.' },
    { name: 'form_control',  type: 'string',         default_val: 'required',  description: 'Key of the control inside the form group.' },
    { name: 'label',         type: 'string',         default_val: "''",        description: 'Field label above the picker.' },
    { name: 'placeholder',   type: 'string',         default_val: "''",        description: 'Placeholder for the date input portion.' },
    { name: 'hint',          type: 'string',         default_val: '—',         description: 'Helper text below the field.' },
    { name: 'is_readonly',   type: 'boolean',        default_val: 'false',     description: 'Locks both the calendar and the time input.' },
    { name: 'is_disabled',   type: 'boolean',        default_val: 'false',     description: 'Disables the control via Angular effect.' },
    { name: 'format',        type: 'DateValueFormat', default_val: "'iso'",    description: '"iso" → YYYY-MM-DD HH:mm; "timestamp" → Unix ms; "custom" → custom_format pattern.' },
    { name: 'custom_format', type: 'string',         default_val: '—',         description: 'Moment.js format pattern when format="custom" (must include time tokens).' },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'string | null', description: 'Emits the formatted datetime string (or null) whenever date or time changes.' },
    { name: 'on_blur',   payload: 'string | null', description: 'Emits the current control value when the date input loses focus.' },
  ];

  readonly internal_notes = [
    { name: 'pickerDate',        kind: 'signal<Date | null>', description: 'JavaScript Date displayed in the Material calendar. Synced via effect when the control is patched.' },
    { name: 'pickerTime',        kind: 'signal<string>',      description: "HH:mm string bound to the native <input type='time'>. Initialised to '00:00' and updated when a date is picked or time changes." },
    { name: 'mergeDateAndTime',  kind: 'private method',      description: 'Combines pickerDate and pickerTime into one Date using moment().hour().minute(). Called by both onDateChange and onTimeInput.' },
    { name: 'onDateChange',      kind: 'method',              description: 'Receives a Date from (dateChange), merges it with the current pickerTime, formats it, and writes to the control.' },
    { name: 'onTimeInput',       kind: 'method',              description: 'Receives HH:mm from (input) on the time field, merges with pickerDate (defaulting to today), formats, and writes to the control.' },
    { name: 'setFormattedValue', kind: 'private method',      description: 'Central write path — formats the merged Date via formatForValue and calls control().setValue({ emitEvent: true }).' },
    { name: 'moment dependency', kind: 'note',                description: 'This component uses the moment.js library for reliable timezone-aware date/time manipulation and formatting.' },
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
      appointment: [null, Validators.required],
    });

    this.variants_form = this.fb.group({
      readonly_field: ['2025-01-15 09:30'],
      minmax_field:   [null, [
        Validators.required,
        domDateMin('2025-01-01'),
        domDateMax('2025-12-31'),
      ]],
    });
  }
}
