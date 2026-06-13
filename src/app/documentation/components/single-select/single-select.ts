import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSingleSelectComponent } from '../../../shared/controls/lib/dom-single-select/dom-input-single-select';

type Tab = 'component' | 'api' | 'visual-flow';

type CountryOption  = { id: string; title: string };
type RoleOption     = { role_id: string; role_name: string };

@Component({
  selector: 'app-single-select',
  imports: [ReactiveFormsModule, DomSingleSelectComponent],
  templateUrl: './single-select.html',
  standalone: true,
})
export class SingleSelect {
  readonly active_tab = signal<Tab>('component');

  readonly simple_form: FormGroup;
  readonly variants_form: FormGroup;

  private readonly route = inject(ActivatedRoute);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component',   value: 'component' },
    { label: 'API',         value: 'api' },
    { label: 'Visual Flow', value: 'visual-flow' },
  ];

  // ─── Option data ─────────────────────────────────────────────────────────────

  readonly country_options: CountryOption[] = [
    { id: 'us', title: 'United States' },
    { id: 'uk', title: 'United Kingdom' },
    { id: 'in', title: 'India' },
    { id: 'ca', title: 'Canada' },
    { id: 'au', title: 'Australia' },
    { id: 'de', title: 'Germany' },
    { id: 'fr', title: 'France' },
  ];

  readonly role_options: RoleOption[] = [
    { role_id: 'admin',  role_name: 'Administrator' },
    { role_id: 'editor', role_name: 'Editor' },
    { role_id: 'viewer', role_name: 'Viewer' },
    { role_id: 'guest',  role_name: 'Guest' },
  ];

  // ─── Content ─────────────────────────────────────────────────────────────────

  readonly component_meta = {
    name:     'DomSingleSelectComponent',
    tag_line: 'Angular standalone component · OnPush · Generic<T>',
    selector: '<dom-single-select> </dom-single-select>',
    purpose: [
      `DomSingleSelectComponent<T> is a searchable single-selection dropdown built on top of Angular Material's ` +
      `MatSelect. It wraps a MatSelect with an inline search input, a clear button, and a chevron toggle, ` +
      `keeping the panel keyboard-accessible while adding type-ahead filtering.`,

      `The component is generic — T must extend Record<string, unknown>. The id_property input (default: "id") ` +
      `determines which field is stored as the form value; title_property (default: "title") determines the ` +
      `display label. You can point both to any key in your option objects, enabling use with any API response shape.`,

      `Searching is purely client-side: the searchQuery signal drives a computed filteredOptions that filters ` +
      `on title_property. The panel is virtualised via CDK ScrollingModule, so large option lists remain performant. ` +
      `A clear button appears when a value is selected (and the control is not disabled), letting the user reset ` +
      `the selection without re-opening the panel.`,
    ],
  };

  readonly snippets = {
    import:
`import { DomSingleSelectComponent } from 'dom-library-core';`,

    simple:
`// TypeScript
readonly country_options = [
  { id: 'us', title: 'United States' },
  { id: 'uk', title: 'United Kingdom' },
  { id: 'in', title: 'India' },
];
// Signal Forms definition
const countryModel = signal(null);
const form = form(countryModel, Validators.required);

// Template
<dom-single-select
  [form]="form"
  form_control="country"
  label="Country"
  [options]="country_options"
/>`,

    disabled:
`// disabled_field: [null]

<dom-single-select
  [form]="form"
  form_control="disabled_field"
  label="Country (disabled)"
  [options]="country_options"
  [is_disabled]="true"
/>`,

    hint:
`// hint_field: [null, Validators.required]

<dom-single-select
  [form]="form"
  form_control="hint_field"
  label="Country"
  hint="Select the country of residence"
  [options]="country_options"
/>`,

    custom_keys:
`// role_options = [
//   { role_id: 'admin',  role_name: 'Administrator' },
//   { role_id: 'editor', role_name: 'Editor' },
// ];
// custom_keys_field: [null, Validators.required]

<dom-single-select
  [form]="form"
  form_control="custom_keys_field"
  label="Role"
  id_property="role_id"
  title_property="role_name"
  [options]="role_options"
/>`,

    outputs:
`<dom-single-select
  [form]="form"
  form_control="country"
  [options]="country_options"
  (on_change)="handleChange($event)"
/>`,
  };

  readonly variants = {
    simple: {
      label:     '5a — Simple dropdown with search, required',
      badge:     'default keys',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Type in the search box to filter options. The clear ✕ button appears when a value is selected.',
    },
    disabled: {
      label:     'Disabled — panel locked, value preserved',
      badge:     '[is_disabled]="true"',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
    hint: {
      label:     'With hint — helper text below the field',
      badge:     'hint="..."',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
    custom_keys: {
      label:     'Custom id_property / title_property',
      badge:     'role_id · role_name',
      badge_cls: 'bg-purple-50 text-purple-700',
      footer:    'Point id_property and title_property to any keys in your option objects — no need to map/reshape your API data.',
    },
  };

  readonly possible_errors = [
    { validator: 'required', message: 'This field is required', example: 'Validators.required — null or empty string selected' },
  ];

  readonly api_inputs = [
    {
      name: 'form',
      type: 'FieldTree',
      default_val: 'required',
      description: 'Signal Forms FieldTree proxy node representing the parent form state.'
    },
    { name: 'form_group',     type: 'FormGroup', default_val: 'required',               description: 'Parent reactive form group (legacy fallback mode).' },
    { name: 'form_control',   type: 'string',    default_val: 'required',               description: 'Key of the control inside the form group.' },
    { name: 'options',        type: 'T[]',        default_val: 'required',               description: 'Array of option objects to render in the dropdown.' },
    { name: 'id_property',    type: 'string',    default_val: "'id'",                   description: 'Object key used as the stored form value when an option is selected.' },
    { name: 'title_property', type: 'string',    default_val: "'title'",                description: 'Object key used as the display label inside the dropdown.' },
    { name: 'label',          type: 'string',    default_val: "''",                     description: 'Field label displayed above the select.' },
    { name: 'placeholder',    type: 'string',    default_val: "'Search or select...'",  description: 'Placeholder shown inside the trigger when no value is selected.' },
    { name: 'hint',           type: 'string',    default_val: '—',                      description: 'Helper text below the field (rendered as mat-hint).' },
    { name: 'is_disabled',    type: 'boolean',   default_val: 'false',                  description: 'Disables the control via Angular effect without emitting value changes.' },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'T (full option object)', description: 'Emits the entire option object (not just the ID) when a selection is made.' },
  ];

  readonly internal_notes = [
    { name: 'control',         kind: 'computed<FormControl>', description: 'Derives the FormControl from form_group().controls[form_control()].' },
    { name: 'is_required',     kind: 'computed<boolean>',     description: 'Drives the asterisk next to the label.' },
    { name: 'hasValue',        kind: 'computed<boolean>',     description: 'True when control value is not null / undefined / empty string — controls clear button visibility.' },
    { name: 'searchQuery',     kind: 'signal<string>',        description: 'Bound to the search <input> inside the panel. Cleared when the panel closes.' },
    { name: 'dynamic_options', kind: 'signal<T[]>',           description: 'Mirrors the options() input via an effect. Allows future dynamic loading without breaking filteredOptions.' },
    { name: 'filteredOptions', kind: 'computed<T[]>',         description: 'Filters dynamic_options by searchQuery on title_property. Returns all options when query is empty.' },
    { name: 'panelOpen',       kind: 'signal<boolean>',       description: 'Tracks panel state — used to switch the chevron icon and clear searchQuery on close.' },
    { name: 'togglePanel',     kind: 'method',                description: 'Programmatically opens/closes the MatSelect via viewChild reference.' },
    { name: 'clearSelection',  kind: 'method',                description: 'Sets control value to null, emits on_change(null), and clears searchQuery. Stops event propagation to avoid re-opening the panel.' },
    { name: 'onSelectionChange', kind: 'method',              description: 'Finds the full option object matching the selected ID and emits it via on_change.' },
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
      country: [null, Validators.required],
    });

    this.variants_form = this.fb.group({
      disabled_field:    [null],
      hint_field:        [null],
      custom_keys_field: [null, Validators.required],
    });
  }
}
