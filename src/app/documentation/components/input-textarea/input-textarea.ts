import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomTextareaComponent } from '../../../shared/controls/lib/dom-input-textarea/dom-input-textarea.component';

type Tab = 'component' | 'api' | 'visual-flow';

@Component({
  selector: 'app-input-textarea',
  imports: [ReactiveFormsModule, DomTextareaComponent],
  templateUrl: './input-textarea.html',
  standalone: true,
})
export class InputTextarea {
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
    name:     'DomTextareaComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-inputarea> </dom-inputarea>',
    purpose: [
      `DomTextareaComponent is a fully reactive multi-line text input wrapper designed for Angular Reactive Forms. ` +
      `It accepts a FormGroup and the string key of the target control, resolving the FormControl ` +
      `internally via a computed signal — always in sync without any extra wiring.`,

      `The component exposes a rows input to control the initial visible height of the textarea, ` +
      `and an auto_resize flag (default true) that allows the field to grow as the user types. ` +
      `A max_length input sets the native maxlength attribute to cap character entry at the browser level.`,

      `Built-in features include an optional label with an automatic required asterisk, placeholder, ` +
      `hint text, read-only and disabled states, and inline validation error messages rendered by ` +
      `<dom-error>. The textarea is vertically resizable (resize-y) by default.`,
    ],
  };

  // ─── Code snippets ──────────────────────────────────────────────────────────

  readonly snippets = {
    import:
`import { DomTextareaComponent } from 'dom-library-core';`,

    simple:
`// TypeScript
// Signal Forms definition
const descriptionModel = signal('');
const form = form(descriptionModel, Validators.required);

// Template
<dom-inputarea
  [form]="form"
  form_control="description"
  label="Description"
  placeholder="Enter a description..."
/>`,

    maxlength:
`// maxlength_field: ['', Validators.maxLength(200)]

<dom-inputarea
  [form]="form"
  form_control="maxlength_field"
  label="Bio (max 200 chars)"
  placeholder="Tell us about yourself..."
  hint="Maximum 200 characters"
  [max_length]="200"
/>`,

    rows:
`// rows_field: ['']

<dom-inputarea
  [form]="form"
  form_control="rows_field"
  label="Notes"
  placeholder="Enter extended notes..."
  [rows]="6"
/>`,

    readonly:
`// readonly_field: ['Pre-filled read-only content']

<dom-inputarea
  [form]="form"
  form_control="readonly_field"
  label="Terms of Service"
  [is_readonly]="true"
  [rows]="4"
/>`,

    hint:
`// hint_field: ['']

<dom-inputarea
  [form]="form"
  form_control="hint_field"
  label="Comments"
  placeholder="Any additional comments..."
  hint="Your feedback helps us improve"
/>`,

    outputs:
`<dom-inputarea
  [form]="form"
  form_control="notes"
  (on_change)="handleChange($event)"
  (on_blur)="handleBlur($event)"
/>`,
  };

  // ─── Variant card headers & footers ─────────────────────────────────────────

  readonly variants = {
    simple: {
      label:     'Simple usage (required textarea)',
      badge:     'Validators.required',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Touch the field and clear it to trigger the required error message.',
    },
    maxlength: {
      label:     'Max length — character cap at the browser level',
      badge:     '[max_length]="200"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'The browser blocks input beyond 200 characters. The maxlength validator also catches pasted content over the limit.',
    },
    rows: {
      label:     'Custom rows — control the initial visible height',
      badge:     '[rows]="6"',
      badge_cls: 'bg-purple-50 text-purple-700',
      footer:    'rows sets the initial height. The textarea is still vertically resizable by the user (resize-y).',
    },
    readonly: {
      label:     'Read-only — content visible but not editable',
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
    { validator: 'minlength', message: 'Minimum N characters',     example: 'Validators.minLength(10)' },
    { validator: 'maxlength', message: 'Maximum N characters',     example: 'Validators.maxLength(200)' },
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
    { name: 'form_group',   type: 'FormGroup', default_val: 'required', description: 'Parent reactive form group (legacy fallback mode).' },
    { name: 'form_control', type: 'string',    default_val: 'required', description: 'Key of the control inside the form group.' },
    { name: 'label',        type: 'string',    default_val: "''",       description: 'Label displayed above the textarea.' },
    { name: 'placeholder',  type: 'string',    default_val: "''",       description: 'Placeholder text shown inside the textarea.' },
    { name: 'hint',         type: 'string',    default_val: '—',        description: 'Helper text displayed below the textarea.' },
    { name: 'is_readonly',  type: 'boolean',   default_val: 'false',    description: 'Renders the field as non-editable (value still readable).' },
    { name: 'is_disabled',  type: 'boolean',   default_val: 'false',    description: 'Disables the control via Angular effect without emitting value changes.' },
    { name: 'rows',         type: 'number',    default_val: '3',        description: 'Number of visible text rows. Controls the initial height of the textarea.' },
    { name: 'max_length',   type: 'number',    default_val: '—',        description: 'Sets the native maxlength attribute to cap character entry at the browser level.' },
    { name: 'auto_resize',  type: 'boolean',   default_val: 'true',     description: 'When true, allows the textarea to grow vertically as the user types (resize-y CSS).' },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'any', description: 'Emits the current value on every keystroke via valueChanges subscription.' },
    { name: 'on_blur',   payload: 'any', description: 'Emits the current control value when the textarea loses focus.' },
  ];

  readonly internal_notes = [
    { name: 'control',               kind: 'computed<FormControl>',       description: 'Derives the FormControl from the parent FormGroup on every signal change — always in sync, no need to pass a FormControl directly.' },
    { name: 'is_required',           kind: 'computed<boolean>',           description: 'Checks whether Validators.required is attached to the control. Drives the asterisk (*) shown next to the label automatically.' },
    { name: 'is_disabled effect',    kind: 'effect',                      description: 'Calls ctrl.disable() or ctrl.enable() with { emitEvent: false } so toggling disabled state never triggers valueChanges or on_change.' },
    { name: 'valueChanges subscription', kind: 'effect + takeUntilDestroyed', description: "Subscribes to the control's valueChanges inside an effect and automatically unsubscribes when the component is destroyed via DestroyRef." },
    { name: 'resize-y CSS',          kind: 'CSS class',                   description: 'The textarea always has resize-y applied, letting users manually drag to resize vertically regardless of the auto_resize flag.' },
    { name: 'on_blur emission',      kind: 'template binding',            description: '(blur) directly emits control().value — no intermediate method needed since no formatting is applied on blur (unlike the number component).' },
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
      description: ['', Validators.required],
    });

    this.variants_form = this.fb.group({
      maxlength_field: ['', Validators.maxLength(200)],
      rows_field:      [''],
      readonly_field:  ['Pre-filled read-only content that the user cannot modify.'],
      hint_field:      [''],
    });
  }
}
