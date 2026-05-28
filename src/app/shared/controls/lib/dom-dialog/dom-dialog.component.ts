import { Component, input, output, effect, HostListener, signal, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dom-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dom-dialog.component.html',
  styleUrl: './dom-dialog.component.css',
})
export class DomDialogComponent {
  readonly is_open = input<boolean>(false, { alias: 'is_open' });
  readonly title = input<string>('');
  readonly header_template = input<TemplateRef<any> | null>(null);
  readonly size = input<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  readonly close_on_backdrop = input<boolean>(true, { alias: 'close_on_backdrop' });
  readonly close_on_escape = input<boolean>(true, { alias: 'close_on_escape' });

  readonly on_close = output<void>({ alias: 'on_close' });

  readonly is_visible = signal<boolean>(false);
  readonly is_rendered = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.is_open()) {
        this.is_rendered.set(true);
        setTimeout(() => {
          this.is_visible.set(true);
          document.body.style.overflow = 'hidden'; // Lock background scroll
        }, 10);
      } else {
        this.is_visible.set(false);
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
