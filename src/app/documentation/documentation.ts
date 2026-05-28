import { Component, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomToastContainerComponent } from '../shared/controls/public-api';

export interface NavChild {
  label: string;
  anchor: string | null;
  indent?: boolean;
}

export interface NavTab {
  label: string;
  value: string;
  route: string;
  description: string;
  fa_icon: string; // FontAwesome icon class
  children: NavChild[];
  category: 'getting-started' | 'form' | 'overlay' | 'media' | 'utility';
}

export interface SearchHit {
  type: 'page' | 'anchor';
  tab: NavTab;
  child?: NavChild;
  score: number;
}

export interface CategoryDef {
  id: 'getting-started' | 'form' | 'overlay' | 'media' | 'utility';
  label: string;
  fa_icon: string;
}

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    FormsModule,
    DomToastContainerComponent,
  ],
  templateUrl: './documentation.html',
})
export class Documentation {
  readonly search_query = signal<string>('');

  // Track expanded state for categories
  readonly active_categories = signal<Record<string, boolean>>({
    'getting-started': true,
    'form': true,
    'overlay': true,
    'media': true,
    'utility': true,
  });

  // Categories definition
  readonly categories: CategoryDef[] = [
    { id: 'getting-started', label: 'Getting Started', fa_icon: 'fa-rocket' },
    { id: 'form', label: 'Form Controls', fa_icon: 'fa-keyboard' },
    { id: 'overlay', label: 'Overlays', fa_icon: 'fa-window-restore' },
    { id: 'media', label: 'Media & Slides', fa_icon: 'fa-images' },
    { id: 'utility', label: 'Utilities & Actions', fa_icon: 'fa-wand-magic-sparkles' },
  ];

  readonly tabs: NavTab[] = [
    {
      label: 'Overview',
      value: 'overview',
      fa_icon: 'fa-house',
      route: '/documentation/overview',
      description: 'Library introduction and setup guide',
      children: [],
      category: 'getting-started',
    },
    {
      label: 'Installation & Usage',
      value: 'install',
      fa_icon: 'fa-rocket',
      route: '/documentation/install',
      description: 'How to build, publish, install and set up in your projects',
      children: [],
      category: 'getting-started',
    },
    {
      label: 'Input',
      value: 'input',
      fa_icon: 'fa-keyboard',
      route: '/documentation/input',
      description: 'Text input — text, email, and password types',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Simple', anchor: 'usage-simple', indent: true },
        { label: 'Text', anchor: 'usage-text', indent: true },
        { label: 'Email', anchor: 'usage-email', indent: true },
        { label: 'Password', anchor: 'usage-password', indent: true },
        { label: 'Read-only', anchor: 'usage-readonly', indent: true },
        { label: 'Hint', anchor: 'usage-hint', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Input Number',
      value: 'input-number',
      fa_icon: 'fa-hashtag',
      route: '/documentation/input-number',
      description: 'Numeric input for integers and decimals with min/max',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Simple', anchor: 'usage-simple', indent: true },
        { label: 'Integer min/max', anchor: 'usage-minmax', indent: true },
        { label: 'Decimal', anchor: 'usage-decimal', indent: true },
        { label: 'Read-only', anchor: 'usage-readonly', indent: true },
        { label: 'Hint', anchor: 'usage-hint', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Input Textarea',
      value: 'input-textarea',
      fa_icon: 'fa-align-left',
      route: '/documentation/input-textarea',
      description: 'Multi-line textarea with auto-resize and character count',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Simple', anchor: 'usage-simple', indent: true },
        { label: 'Max length', anchor: 'usage-maxlength', indent: true },
        { label: 'Custom rows', anchor: 'usage-rows', indent: true },
        { label: 'Read-only', anchor: 'usage-readonly', indent: true },
        { label: 'Hint', anchor: 'usage-hint', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Checkbox',
      value: 'checkbox',
      fa_icon: 'fa-square-check',
      route: '/documentation/checkbox',
      description: 'Single boolean or multi-option checkbox array',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Single', anchor: 'usage-single', indent: true },
        { label: 'Multi vertical', anchor: 'usage-multi-v', indent: true },
        { label: 'Multi horizontal', anchor: 'usage-multi-h', indent: true },
        { label: 'Disabled', anchor: 'usage-disabled', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Toggle',
      value: 'toggle',
      fa_icon: 'fa-toggle-on',
      route: '/documentation/toggle',
      description: 'Slide toggle with custom on/off labels',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Simple', anchor: 'usage-simple', indent: true },
        { label: 'Required', anchor: 'usage-required', indent: true },
        { label: 'Custom labels', anchor: 'usage-labels', indent: true },
        { label: 'Disabled', anchor: 'usage-disabled', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Radio',
      value: 'radio',
      fa_icon: 'fa-circle-dot',
      route: '/documentation/radio',
      description: 'Radio button group — vertical or horizontal layout',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Simple vertical', anchor: 'usage-simple', indent: true },
        { label: 'Horizontal', anchor: 'usage-horizontal', indent: true },
        { label: 'Disabled option', anchor: 'usage-disabled', indent: true },
        { label: 'With hint', anchor: 'usage-hint', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Single Select',
      value: 'single-select',
      fa_icon: 'fa-chevron-down',
      route: '/documentation/single-select',
      description: 'Dropdown select with optional search filter',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Simple', anchor: 'usage-simple', indent: true },
        { label: 'With search', anchor: 'usage-search', indent: true },
        { label: 'Disabled option', anchor: 'usage-disabled', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Multi Select',
      value: 'multi-select',
      fa_icon: 'fa-list-check',
      route: '/documentation/multi-select',
      description: 'Multi-option select with select-all and search',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Simple', anchor: 'usage-simple', indent: true },
        { label: 'Select all', anchor: 'usage-selectall', indent: true },
        { label: 'Max select', anchor: 'usage-max', indent: true },
        { label: 'With search', anchor: 'usage-search', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Date Picker',
      value: 'date-picker',
      fa_icon: 'fa-calendar-days',
      route: '/documentation/date-picker',
      description: 'Calendar date picker with min/max date support',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Simple', anchor: 'usage-simple', indent: true },
        { label: 'Min/max date', anchor: 'usage-minmax', indent: true },
        { label: 'Read-only', anchor: 'usage-readonly', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Datetime Picker',
      value: 'datetime-picker',
      fa_icon: 'fa-calendar',
      route: '/documentation/datetime-picker',
      description: 'Combined date and time picker in one control',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Simple', anchor: 'usage-simple', indent: true },
        { label: '12h / 24h', anchor: 'usage-timeformat', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Files',
      value: 'files',
      fa_icon: 'fa-cloud-arrow-up',
      route: '/documentation/files',
      description: 'Drag-and-drop file upload with image preview',
      children: [
        { label: 'Name', anchor: 'section-name' },
        { label: 'Import', anchor: 'section-import' },
        { label: 'Selector', anchor: 'section-selector' },
        { label: 'Purpose', anchor: 'section-purpose' },
        { label: 'Usage', anchor: null },
        { label: 'Single file', anchor: 'usage-single', indent: true },
        { label: 'Multiple files', anchor: 'usage-multiple', indent: true },
        { label: 'Image preview', anchor: 'usage-preview', indent: true },
        { label: 'File types', anchor: 'usage-accept', indent: true },
        { label: 'Possible Errors', anchor: 'section-errors' },
      ],
      category: 'form',
    },
    {
      label: 'Mobile Number',
      value: 'mobile-number',
      fa_icon: 'fa-mobile-screen',
      route: '/documentation/mobile-number',
      description: 'Country code dropdown paired with phone number input',
      children: [],
      category: 'form',
    },
    {
      label: 'Name Buddy',
      value: 'name-buddy',
      fa_icon: 'fa-user-circle',
      route: '/documentation/name-buddy',
      description: 'Full name details including salutations and middle names',
      children: [],
      category: 'form',
    },
    {
      label: 'Select Button',
      value: 'select-button',
      fa_icon: 'fa-square-check',
      route: '/documentation/select-button',
      description: 'Segmented choice toggle button control group',
      children: [],
      category: 'form',
    },
    {
      label: 'Drawer',
      value: 'drawer',
      fa_icon: 'fa-window-maximize',
      route: '/documentation/drawer',
      description: 'Slide-out navigation/details side drawer',
      children: [],
      category: 'overlay',
    },
    {
      label: 'Dialog',
      value: 'dialog',
      fa_icon: 'fa-window-restore',
      route: '/documentation/dialog',
      description: 'Premium animated focus-trapped dialog modal',
      children: [],
      category: 'overlay',
    },
    {
      label: 'Carousel',
      value: 'carousel',
      fa_icon: 'fa-images',
      route: '/documentation/carousel',
      description: 'Hardware accelerated autoplay content slider',
      children: [],
      category: 'media',
    },
    {
      label: 'Toast',
      value: 'toast',
      fa_icon: 'fa-bell',
      route: '/documentation/toast',
      description: 'Reactive 8-position stackable toast alerts',
      children: [],
      category: 'utility',
    },
    {
      label: 'Tooltip',
      value: 'tooltip',
      fa_icon: 'fa-comment-dots',
      route: '/documentation/tooltip',
      description: 'Dynamic floating mouse-hover text balloons',
      children: [],
      category: 'utility',
    },
    {
      label: 'Skeleton',
      value: 'skeleton',
      fa_icon: 'fa-wand-magic-sparkles',
      route: '/documentation/skeleton',
      description: 'Animated shimmering loading skeletons',
      children: [],
      category: 'utility',
    },
  ];

  // Group tabs by category reactively
  readonly categorized_tabs = computed(() => {
    const grouped: Record<string, NavTab[]> = {};
    for (const tab of this.tabs) {
      if (!grouped[tab.category]) {
        grouped[tab.category] = [];
      }
      grouped[tab.category].push(tab);
    }
    return grouped;
  });

  // Calculate size counts per category reactively
  readonly category_counts = computed(() => {
    const counts: Record<string, number> = {};
    for (const tab of this.tabs) {
      counts[tab.category] = (counts[tab.category] || 0) + 1;
    }
    return counts;
  });

  // Toggle Category Collapsible state
  toggleCategory(category: string): void {
    this.active_categories.update((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }

  // ── Search ────────────────────────────────────────────────────

  readonly is_searching = computed(() => this.search_query().trim().length > 0);

  readonly search_hits = computed<SearchHit[]>(() => {
    const q = this.search_query().trim().toLowerCase();
    if (!q) return [];

    const hits: SearchHit[] = [];

    for (const tab of this.tabs) {
      const label_match = tab.label.toLowerCase().includes(q);
      const desc_match = tab.description.toLowerCase().includes(q);

      if (label_match || desc_match) {
        hits.push({ type: 'page', tab, score: label_match ? 2 : 1 });
      }

      for (const child of tab.children) {
        if (child.anchor && child.label.toLowerCase().includes(q)) {
          hits.push({ type: 'anchor', tab, child, score: 0 });
        }
      }
    }

    return hits.sort((a, b) => b.score - a.score);
  });

  readonly page_hits = computed(() => this.search_hits().filter((h) => h.type === 'page'));
  readonly anchor_hits = computed(() => this.search_hits().filter((h) => h.type === 'anchor'));
  readonly hit_count = computed(() => this.search_hits().length);

  highlight(text: string): string {
    const q = this.search_query().trim();
    if (!q) return text;
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(
      new RegExp(`(${esc})`, 'gi'),
      '<mark class="bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-200 rounded-sm px-px">$1</mark>'
    );
  }

  clearSearch(): void {
    this.search_query.set('');
  }

  onSearchKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.clearSearch();
  }
}
