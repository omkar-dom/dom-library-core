import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomMultiSelectComponent } from '../../../shared/controls/lib/dom-input-multi-select/dom-input-multi-select';
import { JsonPipe } from '@angular/common';

type Tab = 'component' | 'api' | 'visual-flow';

type TagOption      = { id: string; title: string };
type CategoryOption = { id: string; title: string };

@Component({
  selector: 'app-multi-select',
  imports: [ReactiveFormsModule, DomMultiSelectComponent, JsonPipe],
  templateUrl: './multi-select.html',
  standalone: true,
})
export class MultiSelect {
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

  readonly tag_options: TagOption[] = [
    { id: 'angular',  title: 'Angular'  },
    { id: 'react',    title: 'React'    },
    { id: 'vue',      title: 'Vue'      },
    { id: 'svelte',   title: 'Svelte'   },
    { id: 'nextjs',   title: 'Next.js'  },
    { id: 'nuxtjs',   title: 'Nuxt.js'  },
  ];

  readonly category_options: CategoryOption[] = [
    { id: 'frontend',  title: 'Frontend'  },
    { id: 'backend',   title: 'Backend'   },
    { id: 'devops',    title: 'DevOps'    },
    { id: 'design',    title: 'Design'    },
    { id: 'mobile',    title: 'Mobile'    },
  ];

  // ─── Content ─────────────────────────────────────────────────────────────────

  readonly component_meta = {
    name:     'DomMultiSelectComponent',
    tag_line: 'Angular standalone component · OnPush · Generic<T>',
    selector: '<dom-multi-select> </dom-multi-select>',
    purpose: [
      `DomMultiSelectComponent<T> is a searchable multi-selection dropdown built on Angular Material's MatSelect ` +
      `with multiple enabled. It adds a built-in "All" option (backed by the __all__ sentinel value) that lets ` +
      `users select or deselect all items in one click, with smart toggle logic that keeps the All checkbox ` +
      `in sync with individual selections.`,

      `Like DomSingleSelectComponent, the component is generic (T extends Record<string, unknown>) and accepts ` +
      `id_property / title_property inputs so it works directly with any API shape. The control value is an ` +
      `array of IDs — Validators.required checks that at least one is selected.`,

      `Searching is client-side via the filteredOptions computed signal. The panel closes search and resets ` +
      `the query on close. on_change emits the full T[] of selected option objects (not just IDs), making it ` +
      `easy to render selection summaries or pass rich data to parent components.`,
    ],
  };

  readonly snippets = {
    import:
`import { DomMultiSelectComponent } from '@app/shared/controls/lib/dom-input-multi-select/dom-input-multi-select';

// or via the public API barrel:
import { DomMultiSelectComponent } from '@app/shared/controls/public-api';`,

    simple:
`// TypeScript
readonly tag_options = [
  { id: 'angular', title: 'Angular' },
  { id: 'react',   title: 'React'   },
  { id: 'vue',     title: 'Vue'     },
];
this.simple_form = this.fb.group({
  tags: [[], Validators.required],
});

// Template
<dom-multi-select
  [form_group]="simple_form"
  form_control="tags"
  label="Technologies"
  [options]="tag_options"
/>`,

    hint:
`// hint_field: [[]]

<dom-multi-select
  [form_group]="form"
  form_control="hint_field"
  label="Categories"
  hint="Select all that apply"
  [options]="category_options"
/>`,

    disabled:
`// disabled_field: [['frontend', 'backend']]

<dom-multi-select
  [form_group]="form"
  form_control="disabled_field"
  label="Categories (disabled)"
  [options]="category_options"
  [is_disabled]="true"
/>`,

    outputs:
`<dom-multi-select
  [form_group]="form"
  form_control="tags"
  [options]="tag_options"
  (on_change)="handleChange($event)"  <!-- emits T[] of selected objects -->
/>`,
  };

  readonly variants = {
    simple: {
      label:     '5a — Multi-select with search and "All" option, required',
      badge:     'multiple',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Click "All" to select everything at once. Deselecting any individual item automatically unchecks "All".',
    },
    hint: {
      label:     'With hint — helper text below the field',
      badge:     'hint="..."',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
    disabled: {
      label:     'Disabled — pre-filled values visible but non-interactive',
      badge:     '[is_disabled]="true"',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
  };

  readonly possible_errors = [
    { validator: 'required', message: 'This field is required', example: 'Validators.required — empty array []' },
  ];

  readonly api_inputs = [
    { name: 'form_group',     type: 'FormGroup', default_val: 'required',               description: 'Parent reactive form group that owns the control.' },
    { name: 'form_control',   type: 'string',    default_val: 'required',               description: 'Key of the control inside the form group.' },
    { name: 'options',        type: 'T[]',        default_val: 'required',               description: 'Array of option objects rendered in the panel.' },
    { name: 'id_property',    type: 'string',    default_val: "'id'",                   description: 'Object key stored in the form value array when an option is selected.' },
    { name: 'title_property', type: 'string',    default_val: "'title'",                description: 'Object key used as the display label for each option.' },
    { name: 'label',          type: 'string',    default_val: "''",                     description: 'Field label displayed above the select.' },
    { name: 'placeholder',    type: 'string',    default_val: "'Search or select...'",  description: 'Placeholder shown inside the trigger when no value is selected.' },
    { name: 'hint',           type: 'string',    default_val: '—',                      description: 'Helper text below the field (rendered as mat-hint).' },
    { name: 'is_disabled',    type: 'boolean',   default_val: 'false',                  description: 'Disables the control via Angular effect without emitting value changes.' },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'T[]', description: 'Emits the array of full option objects (not IDs) whenever the selection changes.' },
  ];

  readonly internal_notes = [
    { name: 'ALL_VALUE',       kind: 'constant',              description: "Sentinel value '__all__' stored alongside real IDs when all items are selected — distinguishes explicit All from incidental full selection." },
    { name: 'allSelected',     kind: 'computed<boolean>',     description: 'True when every option ID is in the control value array. Drives the All option checked state.' },
    { name: 'filteredOptions', kind: 'computed<T[]>',         description: 'Filters dynamic_options by searchQuery on title_property.' },
    { name: 'previousValue',   kind: 'signal<unknown[]>',     description: 'Stores the last committed value to detect whether the "All" option was just toggled or a real item was clicked.' },
    { name: 'onSelectionChange', kind: 'method',              description: 'Implements four cases: All just selected → add all IDs; All just deselected → clear all; individual toggle; auto-check All when all real items happen to be checked.' },
    { name: 'isSelected',      kind: 'method',                description: 'Checks if an option ID is in the current control value array — used by the template for bg-blue-100 highlight.' },
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
      tags: [[], Validators.required],
    });

    this.variants_form = this.fb.group({
      hint_field:     [[]],
      disabled_field: [['frontend', 'backend']],
    });
  }
}
