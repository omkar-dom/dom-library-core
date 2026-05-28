import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomToastService, ToastPosition } from '../../../shared/controls/public-api';

type Tab = 'component' | 'api';

@Component({
  selector: 'app-showcase-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
})
export class ToastShowcase {
  readonly active_tab = signal<Tab>('component');

  private readonly toast = inject(DomToastService);

  readonly selected_position = signal<ToastPosition>('top-right');

  readonly positions: ToastPosition[] = [
    'top-left', 'top-center', 'top-right',
    'center-left', 'center-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ];

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
  ];

  readonly component_meta = {
    name: 'DomToastService',
    tag_line: 'Angular Injectable Service · Globally Available',
    selector: 'DomToastService injection',
    purpose: [
      `DomToastService is a reactive notification manager that publishes feedback toasts anywhere in your application.`,
      `It manages a reactive stack of dynamic toast configurations, handles positioning mappings for all 8 viewport positions, auto-dismiss intervals, and premium bounce entry micro-animations.`
    ],
  };

  readonly snippets = {
    import: `import { DomToastService } from 'dom-library';`,
    usage: `// 1. Inject the Toast Service
private readonly toast = inject(DomToastService);

// 2. Trigger Toasts with simple method calls
this.toast.success('Settings saved successfully!');
this.toast.error('Connection timed out. Please retry.');
this.toast.warning('Storage reaching capacity soon.', 'bottom-right');

// 3. Customize duration or generic parameters
this.toast.show('Loading file contents...', {
  type: 'info',
  position: 'bottom-center',
  duration: 6000
});`
  };

  readonly api_methods = [
    { name: "success(message, position?, duration?)", returns: 'string (id)', description: "Publishes a green positive verification card. Position defaults to 'top-right'." },
    { name: "error(message, position?, duration?)", returns: 'string (id)', description: "Publishes a red severity error warning alert." },
    { name: "warning(message, position?, duration?)", returns: 'string (id)', description: "Publishes a yellow precaution info message." },
    { name: "info(message, position?, duration?)", returns: 'string (id)', description: "Publishes a standard blue helper text notification." },
    { name: "show(message, options?)", returns: 'string (id)', description: "Generic custom publisher taking object options: type, position, duration." },
    { name: "remove(id)", returns: 'void', description: "Removes specific toast matching id immediately." }
  ];

  triggerSuccess(): void {
    this.toast.success(`Success! Operation completed on the server.`, this.selected_position());
  }

  triggerError(): void {
    this.toast.error(`Error: Connection rejected by database pipeline.`, this.selected_position());
  }

  triggerWarning(): void {
    this.toast.warning(`Warning: System reaching resource thresholds.`, this.selected_position());
  }

  triggerInfo(): void {
    this.toast.info(`Information: Server synchronized completed.`, this.selected_position());
  }

  triggerActionToast(): void {
    this.toast.show(`File 'analytics_report.csv' has been deleted.`, {
      type: 'warning',
      position: this.selected_position(),
      duration: 6000,
      action: {
        label: 'Undo Delete',
        callback: () => {
          this.toast.success('Restored analytics_report.csv successfully!', this.selected_position());
        }
      }
    });
  }
}
