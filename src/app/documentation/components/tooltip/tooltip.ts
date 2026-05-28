import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomTooltipDirective } from '../../../shared/controls/public-api';

type Tab = 'component' | 'api';

@Component({
  selector: 'app-showcase-tooltip',
  standalone: true,
  imports: [CommonModule, DomTooltipDirective],
  templateUrl: './tooltip.html',
})
export class TooltipShowcase {
  readonly active_tab = signal<Tab>('component');

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
  ];

  readonly component_meta = {
    name: 'DomTooltipDirective',
    tag_line: 'Angular Standalone Directive · OnPush compatible',
    selector: '[domTooltip]',
    purpose: [
      `DomTooltipDirective is a responsive floating popup trigger bound to hover, focus, or tab-navigation states.`,
      `It computes element constraints automatically, anchors balloon nodes inside the active window, and fade-scales elements smoothly upon show/hide.`
    ],
  };

  readonly snippets = {
    import: `import { DomTooltipDirective } from 'dom-library';`,
    usage: `<button domTooltip="Save changes to database" tooltip_position="top" class="px-4 py-2 bg-indigo-600 text-white rounded-md">
  Save Settings
</button>`
  };

  readonly api_inputs = [
    { name: 'domTooltip', type: 'string', default_val: 'required', description: 'The text content displayed inside the floating balloon.' },
    { name: 'tooltip_position', type: "'top' | 'bottom' | 'left' | 'right'", default_val: "'top'", description: 'Sets the direction the tooltip anchors relative to the host element.' }
  ];
}
