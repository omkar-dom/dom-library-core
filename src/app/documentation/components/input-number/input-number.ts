import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomInputNumberComponent } from '../../../shared/controls/lib/dom-input-number/dom-input-number.component';

type Tab = 'component' | 'api' | 'visual-flow';

@Component({
  selector: 'app-input-number',
  imports: [ReactiveFormsModule, DomInputNumberComponent],
  templateUrl: './input-number.html',
  standalone: true,
})
export class InputNumber {
  readonly active_tab = signal<Tab>('component');

  readonly simple_form: FormGroup;
  readonly variants_form: FormGroup;

  private readonly route = inject(ActivatedRoute);

  // ─── Tab bar ────────────────────────────────────────────────────────────────

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component',   value: 'component' },
    { label: 'API',         value: 'api' },
    { label: 'Visual Flow', value: 'visual-flow' },
  ];

  // ─── Component tab — static metadata ────────────────────────────────────────

  readonly component_meta = {
    name:     'DomInputNumberComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-input-number> </dom-input-number>',
    purpose: [
      `DomInputNumberComponent is a fully reactive numeric input wrapper designed for Angular Reactive Forms. ` +
      `It accepts a FormGroup and the string key of the target control, resolving the FormControl ` +
      `internally via a computed signal — always in sync without any extra wiring.`,

      `The component supports two modes — integer and decimal. In decimal mode, the value is ` +
      `automatically formatted to the configured number of decimal places when the field loses focus. ` +
      `The inputMode attribute is set accordingly so mobile devices show the correct keyboard.`,

      `Built-in features include an optional label with an automatic required asterisk, placeholder, ` +
      `hint text, min/max/step constraints, read-only and disabled states, and inline validation ` +
      `error messages rendered by <dom-error>. Numeric values are right-aligned by default for ` +
      `consistent readability in data-entry forms.`,
    ],
  };

  // ─── Code snippets ──────────────────────────────────────────────────────────

  readonly snippets = {
    import:
`import { DomInputNumberComponent } from 'dom-library-core';`,

    simple:
`// TypeScript
// Signal Forms definition
const quantityModel = signal(null);
const form = form(quantityModel, Validators.required, Validators.min(1)]);

// Template
<dom-input-number
  [form]="form"
  form_control="quantity"
  label="Quantity"
  placeholder="Enter quantity"
/>`,

    minmax:
`// minmax_field: [null, [Validators.required, Validators.min(0), Validators.max(100)]]

<dom-input-number
  [form]="form"
  form_control="minmax_field"
  label="Score (0 – 100)"
  placeholder="0 to 100"
  [min]="0"
  [max]="100"
/>`,

    decimal:
`// decimal_field: [null]

<dom-input-number
  [form]="form"
  form_control="decimal_field"
  label="Price"
  placeholder="0.00"
  mode="decimal"
  [decimal_places]="2"
  [step]="0.01"
/>`,

    readonly:
`// readonly_field: [42]

<dom-input-number
  [form]="form"
  form_control="readonly_field"
  label="Reference value"
  [is_readonly]="true"
/>`,

    hint:
`// hint_field: [null]

<dom-input-number
  [form]="form"
  form_control="hint_field"
  label="Weight (kg)"
  placeholder="e.g. 75"
  hint="Enter weight in kilograms"
/>`,

    outputs:
`<dom-input-number
  [form]="form"
  form_control="amount"
  (on_change)="handleChange($event)"
  (on_blur)="handleBlur($event)"
/>`,
  };

  // ─── Variant card headers & footers ─────────────────────────────────────────

  readonly variants = {
    simple: {
      label:     'Simple usage (required integer)',
      badge:     'mode="integer"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Touch the field and clear it to trigger the required error. Enter 0 to trigger the min error.',
    },
    minmax: {
      label:     'Integer — min(0) / max(100) range constraints',
      badge:     '[min]="0" [max]="100"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Enter a value below 0 or above 100 and blur to see the min / max error messages.',
    },
    decimal: {
      label:     'Decimal — auto-formats to 2 decimal places on blur',
      badge:     'mode="decimal"',
      badge_cls: 'bg-purple-50 text-purple-700',
      footer:    'Type any number and tab away — the component calls parseFloat().toFixed(2) automatically.',
    },
    readonly: {
      label:     'Read-only — value visible but not editable',
      badge:     '[is_readonly]="true"',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
    hint: {
      label:     'Hint — contextual helper text below the field',
      badge:     'hint="..."',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
  };

  // ─── Possible errors table ───────────────────────────────────────────────────

  readonly possible_errors = [
    { validator: 'required',  message: 'This field is required',   example: 'Validators.required' },
    { validator: 'min',       message: 'Minimum value is N',       example: 'Validators.min(0)' },
    { validator: 'max',       message: 'Maximum value is N',       example: 'Validators.max(100)' },
    { validator: 'minlength', message: 'Minimum N characters',     example: 'Validators.minLength(N)' },
    { validator: 'maxlength', message: 'Maximum N characters',     example: 'Validators.maxLength(N)' },
    { validator: 'pattern',   message: 'Invalid format',           example: 'Validators.pattern(...)' },
  ];

  // ─── API tab ─────────────────────────────────────────────────────────────────

  readonly api_inputs = [
    {
      name: 'form',
      type: 'FieldTree',
      default_val: 'required',
      description: 'Signal Forms FieldTree proxy node representing the parent form state.'
    },
    { name: 'form_group',    type: 'FormGroup',               default_val: 'required', description: 'Parent reactive form group (legacy fallback mode).' },
    { name: 'form_control',  type: 'string',                  default_val: 'required', description: 'Key of the control inside the form group.' },
    { name: 'label',         type: 'string',                  default_val: "''",       description: 'Label displayed above the input field.' },
    { name: 'placeholder',   type: 'string',                  default_val: "''",       description: 'Placeholder text shown inside the input.' },
    { name: 'hint',          type: 'string',                  default_val: '—',        description: 'Helper text displayed below the input.' },
    { name: 'is_readonly',   type: 'boolean',                 default_val: 'false',    description: 'Renders the field as non-editable (value still readable).' },
    { name: 'is_disabled',   type: 'boolean',                 default_val: 'false',    description: 'Disables the control via Angular effect without emitting value changes.' },
    { name: 'mode',          type: "'integer' | 'decimal'",   default_val: "'integer'", description: "Controls number mode. 'decimal' auto-formats on blur and sets inputMode='decimal'." },
    { name: 'min',           type: 'number',                  default_val: '—',        description: 'Sets the native min attribute; used by Validators.min for validation.' },
    { name: 'max',           type: 'number',                  default_val: '—',        description: 'Sets the native max attribute; used by Validators.max for validation.' },
    { name: 'step',          type: 'number',                  default_val: '1',        description: 'Sets the native step attribute (increment per arrow key / spinner click).' },
    { name: 'decimal_places', type: 'number',                 default_val: '2',        description: 'Number of decimal places to format to on blur when mode is decimal.' },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'any', description: 'Emits the current value on every keystroke via valueChanges subscription.' },
    { name: 'on_blur',   payload: 'any', description: 'Emits the current value after decimal formatting is applied on blur.' },
  ];

  readonly internal_notes = [
    { name: 'control',              kind: 'computed<FormControl>',       description: 'Derives the FormControl from the parent FormGroup on every signal change — always in sync, no need to pass a FormControl directly.' },
    { name: 'is_required',          kind: 'computed<boolean>',           description: 'Checks whether Validators.required is attached to the control. Drives the asterisk (*) shown next to the label automatically.' },
    { name: 'is_disabled effect',   kind: 'effect',                      description: 'Calls ctrl.disable() or ctrl.enable() with { emitEvent: false } so toggling disabled state never triggers valueChanges or on_change.' },
    { name: 'valueChanges subscription', kind: 'effect + takeUntilDestroyed', description: "Subscribes to the control's valueChanges inside an effect and automatically unsubscribes when the component is destroyed via DestroyRef." },
    { name: 'onBlur()',             kind: 'method',                      description: "When mode is 'decimal', calls parseFloat(value).toFixed(decimal_places) with emitEvent: false so the formatted value is set without triggering on_change. Then emits on_blur." },
    { name: 'inputMode binding',    kind: 'template binding',            description: "Sets [inputMode]='decimal' or 'numeric' on the native input, prompting mobile devices to show the appropriate on-screen keyboard." },
    { name: 'text-right alignment', kind: 'CSS class',                   description: 'Values are right-aligned (text-right) by default — a standard convention for numeric columns in data-entry and table contexts.' },
  ];

  constructor(private readonly fb: FormBuilder) {
    // Fragment navigation: switch to Component tab then scroll to the anchor
    this.route.fragment.subscribe(fragment => {
      if (!fragment) return;
      this.active_tab.set('component');
      setTimeout(() => {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });

    this.simple_form = this.fb.group({
      quantity: [null, [Validators.required, Validators.min(1)]],
    });

    this.variants_form = this.fb.group({
      minmax_field:  [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      decimal_field: [null],
      readonly_field:[42],
      hint_field:    [null],
    });
  }
}
