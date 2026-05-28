import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type DocSection = 'architecture' | 'components' | 'publishing' | 'hosting' | 'roadmap';

@Component({
  selector: 'app-system-design',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-design.html',
  styles: [`
    :host {
      scroll-behavior: smooth;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class SystemDesignComponent {
  readonly activeSection = signal<DocSection>('architecture');
  readonly mobileMenuOpen = signal<boolean>(false);

  readonly copyState = {
    build: false,
    login: false,
    publish: false
  };

  readonly indexItems: { label: string; id: DocSection; fa_icon: string }[] = [
    { label: 'Architecture & Tech', id: 'architecture', fa_icon: 'fa-layer-group' },
    { label: 'Component Catalog',  id: 'components',   fa_icon: 'fa-cubes-stacked' },
    { label: 'NPM Publish Pipeline',id: 'publishing',   fa_icon: 'fa-cloud-arrow-up' },
    { label: 'GitHub CI/CD Hosting',id: 'hosting',      fa_icon: 'fa-globe' },
    { label: 'Future Horizons',    id: 'roadmap',      fa_icon: 'fa-map' }
  ];

  readonly inputControls = [
    'dom-input-text', 'dom-input-number', 'dom-input-textarea', 
    'dom-input-checkbox', 'dom-input-toggle', 'dom-radio', 
    'dom-select-button', 'dom-single-select', 'dom-input-multi-select', 
    'dom-input-date', 'dom-input-date-time', 'dom-mobile-number', 
    'dom-name-buddy'
  ];

  readonly containerControls = [
    'dom-dialog', 'dom-drawer', 'dom-carousel'
  ];

  readonly utilityControls = [
    'dom-error', 'dom-files', 'dom-skeleton', 
    'dom-toast', 'dom-tooltip'
  ];

  readonly snippets = {
    npmBuild: `npx ng build dom-library-core --configuration production`,
    npmLogin: `npm login`,
    npmPublish: `cd dist/dom-library-core
npm publish --access public`
  };

  getActiveLabel(): string {
    const item = this.indexItems.find(i => i.id === this.activeSection());
    return item ? item.label : '';
  }

  getActiveIcon(): string {
    const item = this.indexItems.find(i => i.id === this.activeSection());
    return item ? item.fa_icon : '';
  }

  selectMobileSection(id: DocSection) {
    this.mobileMenuOpen.set(false);
    this.scrollToSection(id);
  }

  scrollToSection(id: DocSection) {
    this.activeSection.set(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset scroll by header height (approx 100px)
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  }

  copyCode(text: string, stateKey: 'build' | 'login' | 'publish') {
    navigator.clipboard.writeText(text).then(() => {
      this.copyState[stateKey] = true;
      setTimeout(() => this.copyState[stateKey] = false, 2000);
    });
  }
}
