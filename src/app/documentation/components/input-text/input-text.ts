import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomInputComponent } from '../../../shared/controls/lib/dom-input-text/dom-input-text.component';

type Tab = 'component' | 'api' | 'visual-flow';

@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule, DomInputComponent],
  templateUrl: './input-text.html',
  standalone: true,
})
export class InputText {
  readonly active_tab = signal<Tab>('component');

  readonly simple_form: FormGroup;
  readonly variants_form: FormGroup;

  private readonly route = inject(ActivatedRoute);

  // ─── Tab bar ────────────────────────────────────────────────────────────────

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
    { label: 'Visual Flow', value: 'visual-flow' },
  ];

  // ─── Component tab — static metadata ────────────────────────────────────────

  readonly component_meta = {
    name: 'DomInputComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-input> </dom-input>',
    purpose: [
      `DomInputComponent is a fully reactive text-input wrapper designed for Angular Reactive Forms. ` +
        `It accepts a FormGroup and the string key of the target control, resolving the FormControl ` +
        `internally via a computed signal — so it always stays in sync without extra wiring.`,

      `The component supports three input types — text, email, and password. Selecting email ` +
        `automatically attaches Validators.email to the control; selecting password reveals a ` +
        `show/hide toggle button.`,

      `Built-in features include an optional label with an automatic required asterisk, a placeholder, ` +
        `a hint line, a character-length cap via maxlength, read-only and disabled states, and inline ` +
        `validation error messages rendered by <dom-error> that map Angular validator errors to human-readable text.`,
    ],
  };

  // ─── Code snippets ──────────────────────────────────────────────────────────

  readonly snippets = {
    import: `import { DomInputComponent } from 'dom-library-core';`,

    simple: `// TypeScript
// Signal Forms definition
const nameModel = signal('');
const form = form(nameModel, Validators.required);

// Template
<dom-input
  [form]="form"
  form_control="name"
  label="Full name"
  placeholder="Enter your full name"
/>`,

    text_max: `// max_field: ['', Validators.maxLength(10)]

<dom-input
  [form]="form"
  form_control="max_field"
  label="Short code"
  placeholder="Up to 10 characters"
  hint="Maximum 10 characters allowed"
  [max_length]="10"
/>`,

    email: `// email_field: ['', [Validators.required, Validators.email]]
// Validators.email is ALSO added automatically by the component
// when type="email", so the explicit one is optional.

<dom-input
  [form]="form"
  form_control="email_field"
  label="Email address"
  placeholder="you@example.com"
  type="email"
/>`,

    password: `// password_field: ['', [Validators.required, Validators.minLength(8)]]

<dom-input
  [form]="form"
  form_control="password_field"
  label="Password"
  placeholder="Min 8 characters"
  type="password"
  [show_password_toggle]="true"
/>`,

    readonly: `// readonly_field: ['Pre-filled read-only value']

<dom-input
  [form]="form"
  form_control="readonly_field"
  label="Reference ID"
  [is_readonly]="true"
/>`,

    hint: `// hint_field: ['']

<dom-input
  [form]="form"
  form_control="hint_field"
  label="Username"
  placeholder="e.g. john_doe"
  hint="Lowercase letters, numbers and underscores only"
/>`,

    outputs: `<dom-input
  [form]="form"
  form_control="email"
  (on_change)="handleChange($event)"
  (on_blur)="handleBlur($event)"
/>`,
  };

  // ─── Variant card headers & footers ─────────────────────────────────────────

  readonly variants = {
    simple: {
      label: 'Simple usage (required field)',
      badge: 'type="text"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer: 'Touch the field and clear it to trigger the required error message.',
    },
    text_max: {
      label: 'Text — with max-length cap (10 chars)',
      badge: 'type="text"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer: null,
    },
    email: {
      label: 'Email — required + auto email validator, hint placeholder',
      badge: 'type="email"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:
        'Touch the field and leave it blank or type an invalid address to see the required / email error messages.',
    },
    password: {
      label: 'Password — required + minLength(8), visibility toggle',
      badge: 'type="password"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:
        'The eye icon toggles between masked and plain text. Touch the field and leave it short to trigger the minlength error.',
    },
    readonly: {
      label: 'Read-only — value visible but not editable',
      badge: '[is_readonly]="true"',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer: null,
    },
    hint: {
      label: 'Hint — contextual helper text below the field',
      badge: 'hint="..."',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer: null,
    },
  };

  // ─── Possible errors table ───────────────────────────────────────────────────

  readonly possible_errors = [
    { validator: 'required', message: 'This field is required', example: 'Validators.required' },
    {
      validator: 'email',
      message: 'Enter a valid email address',
      example: 'Validators.email (auto-added when type="email")',
    },
    { validator: 'minlength', message: 'Minimum N characters', example: 'Validators.minLength(8)' },
    {
      validator: 'maxlength',
      message: 'Maximum N characters',
      example: 'Validators.maxLength(10)',
    },
    { validator: 'min', message: 'Minimum value is N', example: 'Validators.min(0)' },
    { validator: 'max', message: 'Maximum value is N', example: 'Validators.max(100)' },
    { validator: 'pattern', message: 'Invalid format', example: 'Validators.pattern(...)' },
  ];

  // ─── API tab ─────────────────────────────────────────────────────────────────

  readonly api_inputs = [
    {
      name: 'form',
      type: 'FieldTree',
      default_val: 'required',
      description: 'Signal Forms FieldTree proxy node representing the parent form state.'
    },
    {
      name: 'form_group',
      type: 'FormGroup',
      default_val: 'required',
      description: 'Parent reactive form group (legacy fallback mode).',
    },
    {
      name: 'form_control',
      type: 'string',
      default_val: 'required',
      description: 'Key of the control inside the form group.',
    },
    {
      name: 'label',
      type: 'string',
      default_val: "''",
      description: 'Label displayed above the input field.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default_val: "''",
      description: 'Placeholder text shown inside the input.',
    },
    {
      name: 'hint',
      type: 'string',
      default_val: '—',
      description: 'Helper text displayed below the input.',
    },
    {
      name: 'is_readonly',
      type: 'boolean',
      default_val: 'false',
      description: 'Renders the field as non-editable (value still readable).',
    },
    {
      name: 'is_disabled',
      type: 'boolean',
      default_val: 'false',
      description: 'Disables the control via Angular effect without emitting value changes.',
    },
    {
      name: 'type',
      type: "'text' | 'email' | 'password'",
      default_val: "'text'",
      description:
        "Switches input type. 'email' auto-adds Validators.email; 'password' shows a visibility toggle.",
    },
    {
      name: 'max_length',
      type: 'number',
      default_val: '—',
      description: 'Sets the native maxlength attribute on the input element.',
    },
    {
      name: 'show_password_toggle',
      type: 'boolean',
      default_val: 'true',
      description: "Controls visibility of the eye icon for 'password' type fields.",
    },
  ];

  readonly api_outputs = [
    {
      name: 'on_change',
      payload: 'any',
      description: 'Emits the current value on every keystroke via valueChanges subscription.',
    },
    {
      name: 'on_blur',
      payload: 'any',
      description: 'Emits the current control value when the input loses focus.',
    },
  ];

  readonly internal_notes = [
    {
      name: 'control',
      kind: 'computed<FormControl>',
      description:
        'Derives the FormControl from the parent FormGroup on every signal change — always in sync, no need to pass a FormControl directly.',
    },
    {
      name: 'show_pass',
      kind: 'signal<boolean>',
      description:
        'Internal toggle for password visibility. Not exposed as an input; managed by the eye-icon button inside the template.',
    },
    {
      name: 'is_required',
      kind: 'computed<boolean>',
      description:
        'Checks whether Validators.required is attached to the control. Drives the asterisk (*) shown next to the label automatically.',
    },
    {
      name: 'is_disabled effect',
      kind: 'effect',
      description:
        'Calls ctrl.disable() or ctrl.enable() with { emitEvent: false } so toggling disabled state never triggers valueChanges or on_change.',
    },
    {
      name: 'email auto-validator effect',
      kind: 'effect',
      description:
        "When type() === 'email', Validators.email is programmatically added to the control, keeping validation in sync with the type input.",
    },
    {
      name: 'valueChanges subscription',
      kind: 'effect + takeUntilDestroyed',
      description:
        "Subscribes to the control's valueChanges inside an effect and automatically unsubscribes when the component is destroyed via DestroyRef.",
    },
  ];

  constructor(private readonly fb: FormBuilder) {
    // Fragment navigation: switch to Component tab then scroll to the anchor
    this.route.fragment.subscribe((fragment) => {
      if (!fragment) return;
      this.active_tab.set('component');
      // Wait one tick for @if to render the section before scrolling
      setTimeout(() => {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });

    this.simple_form = this.fb.group({
      name: ['', Validators.required],
    });

    this.variants_form = this.fb.group({
      text_field: [''],
      email_field: ['', [Validators.required, Validators.email]],
      password_field: ['', [Validators.required, Validators.minLength(8)]],
      readonly_field: ['Pre-filled read-only value'],
      hint_field: [''],
      max_field: ['', Validators.maxLength(10)],
    });
  }
}
