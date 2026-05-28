import { Component, input, output, signal, effect, ContentChild, TemplateRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dom-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dom-carousel.component.html',
  styleUrl: './dom-carousel.component.css',
})
export class DomCarouselComponent implements OnDestroy {
  readonly items = input.required<any[]>();
  readonly autoplay = input<boolean>(false);
  readonly interval = input<number>(4000);
  readonly show_indicators = input<boolean>(true, { alias: 'show_indicators' });
  readonly show_controls = input<boolean>(true, { alias: 'show_controls' });
  readonly loop = input<boolean>(true);

  readonly on_slide_change = output<number>({ alias: 'on_slide_change' });

  @ContentChild('slideTemplate', { static: false }) 
  readonly slide_template!: TemplateRef<any>;

  readonly active_index = signal<number>(0);
  private autoplay_timer: any = null;

  constructor() {
    effect(() => {
      this.stopAutoplay();
      if (this.autoplay() && this.items().length > 1) {
        this.startAutoplay();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.autoplay_timer = setInterval(() => {
      this.next();
    }, this.interval());
  }

  stopAutoplay(): void {
    if (this.autoplay_timer) {
      clearInterval(this.autoplay_timer);
      this.autoplay_timer = null;
    }
  }

  next(): void {
    const total = this.items().length;
    if (total === 0) return;

    if (this.active_index() === total - 1) {
      if (this.loop()) {
        this.goToSlide(0);
      }
    } else {
      this.goToSlide(this.active_index() + 1);
    }
  }

  prev(): void {
    const total = this.items().length;
    if (total === 0) return;

    if (this.active_index() === 0) {
      if (this.loop()) {
        this.goToSlide(total - 1);
      }
    } else {
      this.goToSlide(this.active_index() - 1);
    }
  }

  goToSlide(index: number): void {
    this.active_index.set(index);
    this.on_slide_change.emit(index);
  }

  onMouseEnter(): void {
    if (this.autoplay()) {
      this.stopAutoplay();
    }
  }

  onMouseLeave(): void {
    if (this.autoplay() && this.items().length > 1) {
      this.startAutoplay();
    }
  }
}
