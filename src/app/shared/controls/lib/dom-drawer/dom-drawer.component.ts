import { Component, input, output, effect, HostListener, signal, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dom-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dom-drawer.component.html',
  styleUrl: './dom-drawer.component.css',
})
export class DomDrawerComponent {
  readonly is_open = input<boolean>(false, { alias: 'is_open' });
  readonly position = input<'left' | 'right' | 'top' | 'bottom'>('right');
  readonly title = input<string>('');
  readonly header_template = input<TemplateRef<any> | null>(null);
  readonly close_on_backdrop = input<boolean>(true, { alias: 'close_on_backdrop' });
  readonly close_on_escape = input<boolean>(true, { alias: 'close_on_escape' });

  readonly on_close = output<void>({ alias: 'on_close' });

  // Internal visual state to coordinate opening/closing animations
  readonly is_visible = signal<boolean>(false);
  readonly is_rendered = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.is_open()) {
        this.is_rendered.set(true);
        // Delay microtask to allow DOM element to render before adding active class for animation
        setTimeout(() => {
          this.is_visible.set(true);
          document.body.style.overflow = 'hidden'; // Lock background scroll
        }, 10);
      } else {
        this.is_visible.set(false);
        // Wait for slide-out animation to complete (300ms) before unrendering
        setTimeout(() => {
          this.is_rendered.set(false);
          document.body.style.overflow = ''; // Unlock background scroll
        }, 300);
      }
    });
  }

  close(): void {
    this.on_close.emit();
  }

  onBackdropClick(): void {
    if (this.close_on_backdrop()) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.is_open() && this.close_on_escape()) {
      this.close();
    }
  }
}
