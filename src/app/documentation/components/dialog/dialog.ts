import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomDialogComponent } from '../../../shared/controls/public-api';

type Tab = 'component' | 'api';

@Component({
  selector: 'app-showcase-dialog',
  standalone: true,
  imports: [CommonModule, DomDialogComponent],
  templateUrl: './dialog.html',
})
export class DialogShowcase {
  readonly active_tab = signal<Tab>('component');

  readonly is_sm_open = signal(false);
  readonly is_md_open = signal(false);
  readonly is_lg_open = signal(false);
  readonly is_xl_open = signal(false);
  readonly is_full_open = signal(false);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
  ];

  readonly component_meta = {
    name: 'DomDialogComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-dialog> </dom-dialog>',
    purpose: [
      `DomDialogComponent is a high-end modal dialogue card layer that sits on top of standard page contents.`,
      `It implements sleek scale-up animations, size classes ranging from sm to full-viewport, full focus trapping accessibility support, and auto close triggers.`
    ],
  };

  readonly snippets = {
    import: `import { DomDialogComponent } from 'dom-library';`,
    usage: `<dom-dialog [is_open]="is_dialog_open" size="md" title="Delete Confirmation" (on_close)="is_dialog_open = false">
  <p>Are you absolutely sure you want to delete this resource?</p>
  <div dialog-footer>
    <button (click)="delete()" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md">Delete</button>
    <button (click)="is_dialog_open = false" class="px-4 py-2 border border-slate-200 rounded-md">Cancel</button>
  </div>
</dom-dialog>`
  };

  readonly api_inputs = [
    { name: 'is_open', type: 'boolean', default_val: 'false', description: 'Sets whether the dialog overlay is active.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default_val: "'md'", description: 'Sets the width/height of the dialog card container.' },
    { name: 'title', type: 'string', default_val: "''", description: 'Header text string.' },
    { name: 'header_template', type: 'TemplateRef<any> | null', default_val: 'null', description: 'Sets a custom TemplateRef to render in the header, overriding the title string.' },
    { name: 'close_on_backdrop', type: 'boolean', default_val: 'true', description: 'Closes dialog when overlay area is clicked.' },
    { name: 'close_on_escape', type: 'boolean', default_val: 'true', description: 'Closes dialog on Escape key press.' }
  ];

  readonly api_outputs = [
    { name: 'on_close', payload: 'void', description: 'Fires when close action triggers.' }
  ];
}
