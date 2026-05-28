import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomDrawerComponent } from '../../../shared/controls/public-api';

type Tab = 'component' | 'api';

@Component({
  selector: 'app-showcase-drawer',
  standalone: true,
  imports: [CommonModule, DomDrawerComponent],
  templateUrl: './drawer.html',
})
export class DrawerShowcase {
  readonly active_tab = signal<Tab>('component');

  readonly is_left_open = signal(false);
  readonly is_right_open = signal(false);
  readonly is_top_open = signal(false);
  readonly is_bottom_open = signal(false);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
  ];

  readonly component_meta = {
    name: 'DomDrawerComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-drawer> </dom-drawer>',
    purpose: [
      `DomDrawerComponent is a modern slide-over container that slides in gracefully from any screen edge: left, right, top, or bottom.`,
      `It features dynamic scroll locking, fully responsive design, custom title configurations, and flexible slot projections for bodies and action footers.`
    ],
  };

  readonly snippets = {
    import: `import { DomDrawerComponent } from 'dom-library';`,
    usage: `<dom-drawer [is_open]="is_drawer_open" position="right" title="Details Panel" (on_close)="is_drawer_open = false">
  <div class="space-y-4">
    <p>This is the main body content of the drawer.</p>
  </div>
  <div drawer-footer>
    <button (click)="is_drawer_open = false" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md">Close</button>
  </div>
</dom-drawer>`
  };

  readonly api_inputs = [
    { name: 'is_open', type: 'boolean', default_val: 'false', description: 'Controls whether the drawer is displayed.' },
    { name: 'position', type: "'left' | 'right' | 'top' | 'bottom'", default_val: "'right'", description: 'Sets the direction the drawer slides in from.' },
    { name: 'title', type: 'string', default_val: "''", description: 'Sets the header title string.' },
    { name: 'header_template', type: 'TemplateRef<any> | null', default_val: 'null', description: 'Sets a custom TemplateRef to render in the header, overriding the title string.' },
    { name: 'close_on_backdrop', type: 'boolean', default_val: 'true', description: 'Closes the drawer when clicking the backdrop overlay.' },
    { name: 'close_on_escape', type: 'boolean', default_val: 'true', description: 'Closes the drawer when clicking the Escape key.' }
  ];

  readonly api_outputs = [
    { name: 'on_close', payload: 'void', description: 'Fires when the drawer triggers a close action.' }
  ];
}
