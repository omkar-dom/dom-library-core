import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSkeletonDirective } from '../../../shared/controls/public-api';

type Tab = 'component' | 'api';

@Component({
  selector: 'app-showcase-skeleton',
  standalone: true,
  imports: [CommonModule, DomSkeletonDirective],
  templateUrl: './skeleton.html',
})
export class SkeletonShowcase {
  readonly active_tab = signal<Tab>('component');

  readonly is_loading = signal(true);

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
  ];

  readonly component_meta = {
    name: 'DomSkeletonDirective',
    tag_line: 'Angular Standalone Directive · OnPush compatible',
    selector: '[domSkeleton]',
    purpose: [
      `DomSkeletonDirective is a custom aesthetic load state utility that can be attached to any host card or list container.`,
      `When active, it dynamically identifies child elements (titles, paragraphs, images, buttons) and locks them behind a gorgeous hardware-accelerated animated shimmer gradient.`
    ],
  };

  readonly snippets = {
    import: `import { DomSkeletonDirective } from 'dom-library';`,
    usage: `<!-- Wrap any card container -->
<div [domSkeleton]="is_loading" class="bg-white p-6 rounded-md border">
  <div class="flex items-center gap-4">
    <!-- Shimmers automatically when active -->
    <img src="avatar.jpg" class="w-12 h-12 rounded-full" />
    <div>
      <h3 class="font-bold">John Doe</h3>
      <span class="text-xs text-slate-400">john.doe@example.com</span>
    </div>
  </div>
</div>`
  };

  readonly api_inputs = [
    { name: 'domSkeleton', type: 'boolean', default_val: 'false', description: 'Sets whether the loading placeholder skeleton shimmer is active.' }
  ];

  toggleLoading(): void {
    this.is_loading.set(!this.is_loading());
  }
}
