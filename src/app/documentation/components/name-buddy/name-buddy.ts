import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomNameBuddyComponent } from '../../../shared/controls/public-api';

type Tab = 'component' | 'api';

@Component({
  selector: 'app-showcase-name-buddy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DomNameBuddyComponent],
  templateUrl: './name-buddy.html',
})
export class NameBuddyShowcase {
  readonly active_tab = signal<Tab>('component');

  readonly form: FormGroup;
  private readonly fb = inject(FormBuilder);

  // Dynamic Visibility Toggles
  readonly hide_salutation = signal(false);
  readonly hide_middle_name = signal(false);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
  ];

  readonly component_meta = {
    name: 'DomNameBuddyComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-name-buddy> </dom-name-buddy>',
    purpose: [
      `DomNameBuddyComponent is a highly cohesive name form group that arranges Salutation, First, Middle, and Last name elements into a single responsive layout grid.`,
      `It features dynamic visibility toggles (hide_salutation, hide_middle_name) which automatically enable/disable and re-arrange columns on the fly, keeping parent reactive forms perfectly synced.`
    ],
  };

  readonly snippets = {
    import: `import { DomNameBuddyComponent } from 'dom-library';`,
    usage: `// TypeScript Setup
this.form = this.fb.group({
  salutation: ['Mr.'],
  first_name: ['', Validators.required],
  middle_name: [''],
  last_name: ['', Validators.required],
});

// HTML Default Usage
<dom-name-buddy
  [form]="form"
  salutation_control="salutation"
  first_name_control="first_name"
  middle_name_control="middle_name"
  last_name_control="last_name"
/>`,
    compact: `<!-- Hiding Salutation and Middle Name -->
<dom-name-buddy
  [form]="form"
  first_name_control="first_name"
  last_name_control="last_name"
  [hide_salutation]="true"
  [hide_middle_name]="true"
/>`
  };

  readonly api_inputs = [
    {
      name: 'form',
      type: 'FieldTree',
      default_val: 'required',
      description: 'Signal Forms FieldTree proxy node representing the parent form state.'
    },
    { name: 'form_group', type: 'FormGroup', default_val: 'required', description: 'Parent form group containing the name controls.' },
    { name: 'first_name_control', type: 'string', default_val: 'required', description: 'String key matching First Name control.' },
    { name: 'last_name_control', type: 'string', default_val: 'required', description: 'String key matching Last Name control.' },
    { name: 'middle_name_control', type: 'string', default_val: "''", description: 'Optional. String key matching Middle Name control.' },
    { name: 'salutation_control', type: 'string', default_val: "''", description: 'Optional. String key matching Salutation control.' },
    { name: 'hide_salutation', type: 'boolean', default_val: 'false', description: 'Toggles visibility of the Salutation dropdown field.' },
    { name: 'hide_middle_name', type: 'boolean', default_val: 'false', description: 'Toggles visibility of the Middle Name text input.' },
    { name: 'label', type: 'string', default_val: "'Full Name'", description: 'Field header label text.' }
  ];

  constructor() {
    this.form = this.fb.group({
      salutation: [''],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    console.log(this.form.value);
  }

  reset(): void {
    this.form.reset({
      salutation: '',
      first_name: '',
      middle_name: '',
      last_name: '',
    });
  }
}
