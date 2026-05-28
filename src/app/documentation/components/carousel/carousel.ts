import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomCarouselComponent } from '../../../shared/controls/public-api';

type Tab = 'component' | 'api';

@Component({
  selector: 'app-showcase-carousel',
  standalone: true,
  imports: [CommonModule, DomCarouselComponent],
  templateUrl: './carousel.html',
})
export class CarouselShowcase {
  readonly active_tab = signal<Tab>('component');

  readonly simple_images = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=600&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&h=600&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&h=600&q=80',
  ];

  readonly custom_cards = [
    { title: 'Premium Design System', desc: 'Craft beautiful responsive user interfaces with ease.', color: 'from-indigo-600 to-sky-600', icon: 'fa-cubes' },
    { title: 'Angular Core Power', desc: 'Built natively utilizing computed signals and standalones.', color: 'from-rose-600 to-amber-500', icon: 'fa-bolt' },
    { title: 'Hardware Accelerated', desc: 'Hardware transitions ensure buttery smooth framerates.', color: 'from-emerald-600 to-teal-500', icon: 'fa-rocket' },
  ];

  readonly tabs: { label: string; value: Tab }[] = [
    { label: 'Component', value: 'component' },
    { label: 'API', value: 'api' },
  ];

  readonly component_meta = {
    name: 'DomCarouselComponent',
    tag_line: 'Angular standalone component · OnPush',
    selector: '<dom-carousel> </dom-carousel>',
    purpose: [
      `DomCarouselComponent is a hardware-accelerated content slider for images, promotional cards, or custom landing sections.`,
      `It features autoplay transitions, touch hover locks, circular navigation loops, visual indicator dots, and content slide projections.`
    ],
  };

  readonly snippets = {
    import: `import { DomCarouselComponent } from 'dom-library';`,
    simple: `<dom-carousel [items]="image_urls" [autoplay]="true" />`,
    custom: `<dom-carousel [items]="card_data" [autoplay]="true">
  <ng-template #slideTemplate let-item>
    <div class="w-full h-full bg-gradient-to-br flex flex-col items-center justify-center text-white text-center p-8">
      <i class="fa-solid [class.item.icon] text-4xl mb-4"></i>
      <h2 class="text-2xl font-bold">{{ item.title }}</h2>
      <p class="text-sm opacity-90 mt-2">{{ item.desc }}</p>
    </div>
  </ng-template>
</dom-carousel>`
  };

  readonly api_inputs = [
    { name: 'items', type: 'any[]', default_val: 'required', description: 'List of slides to render.' },
    { name: 'autoplay', type: 'boolean', default_val: 'false', description: 'Autoplays slide transitions automatically.' },
    { name: 'interval', type: 'number', default_val: '4000', description: 'Interval in milliseconds between transitions.' },
    { name: 'show_indicators', type: 'boolean', default_val: 'true', description: 'Displays sliding visual dot controls.' },
    { name: 'show_controls', type: 'boolean', default_val: 'true', description: 'Displays left/right slide arrows.' },
    { name: 'loop', type: 'boolean', default_val: 'true', description: 'Restarts slide list from index 0 upon list end.' }
  ];

  readonly api_outputs = [
    { name: 'on_slide_change', payload: 'number', description: 'Fires when active slide index updates.' }
  ];
}
