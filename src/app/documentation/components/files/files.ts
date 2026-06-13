import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomFilesComponent } from '../../../shared/controls/lib/dom-files/dom-files.component';

type Tab = 'component' | 'api' | 'visual-flow';

@Component({
  selector: 'app-files',
  imports: [ReactiveFormsModule, DomFilesComponent],
  templateUrl: './files.html',
  standalone: true,
})
export class Files {
  readonly active_tab = signal<Tab>('component');

  readonly simple_form: FormGroup;
  readonly multiple_ctrl  = new FormControl(null);
  readonly image_ctrl     = new FormControl(null);
  readonly disabled_ctrl  = new FormControl(null);

  private readonly route = inject(ActivatedRoute);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component',   value: 'component' },
    { label: 'API',         value: 'api' },
    { label: 'Visual Flow', value: 'visual-flow' },
  ];

  readonly component_meta = {
    name:     'DomFilesComponent',
    tag_line: 'Angular standalone component · OnPush · Drag-and-drop file upload',
    selector: '<dom-files> </dom-files>',
    purpose: [
      `DomFilesComponent is a drag-and-drop file upload control with image preview. It accepts files via ` +
      `a click-triggered file picker, drag-and-drop onto the drop zone, or both. The control value is a ` +
      `File[] array written to the form whenever files are added or removed.`,

      `The component has a unique binding approach: instead of requiring a form_group + string key like ` +
      `the other controls, it also accepts a direct form_control input (a FormControl instance). This ` +
      `makes it easy to use in dynamic form scenarios or outside a form group. When both are provided, ` +
      `form_control takes precedence.`,

      `File validation is built in: max_size_mb rejects files that exceed the size limit, and accept ` +
      `(a comma-separated MIME/extension list matching the native accept attribute) rejects disallowed ` +
      `types. Both produce a human-readable error shown inline. Image files receive a visual preview ` +
      `thumbnail; non-image files show a filename chip with a remove button.`,
    ],
  };

  readonly snippets = {
    import:
`import { DomFilesComponent } from 'dom-library-core';`,

    single:
`// TypeScript — using form_group + control_name
// Signal Forms definition
const documentModel = signal(null);
const form = form(documentModel);

// Template
<dom-files
  [form]="form"
  form_control="document"
  label="Attach document"
  hint="PDF or Word, max 5 MB"
  accept=".pdf,.doc,.docx"
/>`,

    direct_ctrl:
`// TypeScript — using a FormControl directly
readonly upload_ctrl = new FormControl(null);

// Template
<dom-files
  [form_control]="upload_ctrl"
  label="Upload files"
  [multiple]="true"
/>`,

    multiple:
`// multiple_ctrl = new FormControl(null)
// Multiple files, images only, 10 MB limit, preview enabled

<dom-files
  [form_control]="multiple_ctrl"
  label="Product photos"
  [multiple]="true"
  accept="image/*"
  [max_size_mb]="10"
  [show_preview]="true"
/>`,

    images:
`// image_ctrl = new FormControl(null)
// Accept only images, show preview thumbnails

<dom-files
  [form_control]="image_ctrl"
  label="Profile picture"
  accept="image/jpeg,image/png,image/webp"
  [max_size_mb]="2"
  [show_preview]="true"
/>`,

    disabled:
`// disabled_ctrl = new FormControl(null)

<dom-files
  [form_control]="disabled_ctrl"
  label="Upload (disabled)"
  [is_disabled]="true"
/>`,

    outputs:
`<dom-files
  [form]="form"
  form_control="attachments"
  (on_change)="handleFiles($event)"   <!-- emits File[] -->
  (on_blur)="handleBlur($event)"
/>`,
  };

  readonly variants = {
    single: {
      label:     '5a — Single file upload with type filter',
      badge:     'accept=".pdf,.doc,.docx"',
      badge_cls: 'bg-blue-50 text-blue-700',
      footer:    'Click or drag a file onto the drop zone. Files exceeding max_size_mb or not matching accept are rejected with an inline error.',
    },
    multiple: {
      label:     'Multiple files — images only, with preview',
      badge:     '[multiple]="true" · accept="image/*"',
      badge_cls: 'bg-purple-50 text-purple-700',
      footer:    'Image files show a thumbnail preview. Each file has a remove button.',
    },
    images: {
      label:     'Image upload — JPEG/PNG/WebP only, 2 MB max',
      badge:     'accept="image/jpeg,image/png,image/webp"',
      badge_cls: 'bg-green-50 text-green-700',
      footer:    null,
    },
    disabled: {
      label:     'Disabled — drop zone locked, no interaction',
      badge:     '[is_disabled]="true"',
      badge_cls: 'bg-gray-200 text-gray-600',
      footer:    null,
    },
  };

  readonly possible_errors = [
    { validator: 'size limit',  message: '"filename" exceeds the {N}MB limit', example: 'Built-in — set max_size_mb. Default 5 MB.' },
    { validator: 'file type',   message: '"filename" is not an accepted file type', example: 'Built-in — set accept. E.g. accept="image/*,.pdf"' },
    { validator: 'required',    message: 'This field is required', example: 'Validators.required on the FormControl — empty File[]' },
  ];

  readonly api_inputs = [
    {
      name: 'form',
      type: 'FieldTree',
      default_val: 'required',
      description: 'Signal Forms FieldTree proxy node representing the parent form state.'
    },
    { name: 'form_group',   type: 'FormGroup',   default_val: '—',       description: 'Parent form group. Use with control_name to locate the control.' },
    { name: 'form_control', type: 'FormControl', default_val: '—',       description: 'Direct FormControl reference. Takes precedence over form_group + control_name.' },
    { name: 'control_name', type: 'string',      default_val: '—',       description: 'Key used to look up the control inside form_group.' },
    { name: 'label',        type: 'string',      default_val: "''",      description: 'Label above the drop zone.' },
    { name: 'hint',         type: 'string',      default_val: '—',       description: 'Helper text below the drop zone.' },
    { name: 'is_readonly',  type: 'boolean',     default_val: 'false',   description: 'Visually marks the zone as read-only.' },
    { name: 'is_disabled',  type: 'boolean',     default_val: 'false',   description: 'Locks the drop zone and disables the control.' },
    { name: 'accept',       type: 'string',      default_val: "'*'",     description: 'Native accept attribute value — MIME types or extensions (e.g. "image/*,.pdf").' },
    { name: 'multiple',     type: 'boolean',     default_val: 'false',   description: 'Allow selecting/dropping multiple files at once.' },
    { name: 'max_size_mb',  type: 'number',      default_val: '5',       description: 'Maximum file size in megabytes per file.' },
    { name: 'show_preview', type: 'boolean',     default_val: 'true',    description: 'Show image thumbnails for image/* files after selection.' },
  ];

  readonly api_outputs = [
    { name: 'on_change', payload: 'File[]', description: 'Emits the current File[] whenever files are added or removed.' },
    { name: 'on_blur',   payload: 'any',    description: 'Emits the current control value when the drop zone loses focus.' },
  ];

  readonly internal_notes = [
    { name: 'selected_files', kind: 'signal<File[]>',   description: 'Array of File objects currently held by the component. Written to the FormControl via control().setValue(updated).' },
    { name: 'preview_urls',   kind: 'signal<string[]>', description: 'Base64 data URLs generated by FileReader for image files. Indexed in parallel with selected_files.' },
    { name: 'has_error',      kind: 'signal<boolean>',  description: 'Set to true when processFiles rejects a file due to size or type. Cleared on the next valid upload attempt.' },
    { name: 'error_message',  kind: 'signal<string>',   description: 'Human-readable rejection reason shown in the template.' },
    { name: 'drag_over',      kind: 'signal<boolean>',  description: 'Set to true during an active drag to highlight the drop zone with a visual ring.' },
    { name: 'processFiles',   kind: 'private method',   description: 'Validates each File against max_size_mb and accept, builds the updated array, triggers FileReader for images, and calls control().setValue().' },
    { name: 'matchesAccept',  kind: 'private method',   description: 'Parses the accept string and checks MIME type or extension against each token — mirrors browser native accept behaviour.' },
    { name: 'removeFile',     kind: 'method',           description: 'Splices the file and its preview URL by index, then writes the reduced array to the control.' },
    { name: 'control resolve',kind: 'computed',         description: 'control() returns form_control() if provided, otherwise falls back to form_group()?.get(control_name()).' },
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
      document: [null],
    });
  }
}
