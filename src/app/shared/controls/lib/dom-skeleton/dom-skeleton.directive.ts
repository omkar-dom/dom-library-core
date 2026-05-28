import { Directive, input, ElementRef, Renderer2, effect, inject } from '@angular/core';

@Directive({
  selector: '[domSkeleton]',
  standalone: true,
})
export class DomSkeletonDirective {
  readonly domSkeleton = input<boolean>(false, { alias: 'domSkeleton' });

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  private static styles_injected = false;

  constructor() {
    this.injectStyles();

    effect(() => {
      if (this.domSkeleton()) {
        this.applySkeleton();
      } else {
        this.removeSkeleton();
      }
    });
  }

  private applySkeleton(): void {
    const host = this.el.nativeElement as HTMLElement;
    this.renderer.addClass(host, 'dom-skeleton-active');
    this.renderer.setStyle(host, 'pointer-events', 'none');
    this.renderer.setStyle(host, 'user-select', 'none');

    // Make target nodes shimmer
    const targets = host.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, img, button, a, .skeleton-item');
    targets.forEach((child) => {
      this.renderer.addClass(child, 'dom-shimmer');
    });
  }

  private removeSkeleton(): void {
    const host = this.el.nativeElement as HTMLElement;
    this.renderer.removeClass(host, 'dom-skeleton-active');
    this.renderer.removeStyle(host, 'pointer-events');
    this.renderer.removeStyle(host, 'user-select');

    const targets = host.querySelectorAll('.dom-shimmer');
    targets.forEach((child) => {
      this.renderer.removeClass(child, 'dom-shimmer');
    });
  }

  private injectStyles(): void {
    if (DomSkeletonDirective.styles_injected) return;

    const css = `
      @keyframes dom-shimmer-kf {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      .dom-shimmer {
        position: relative !important;
        overflow: hidden !important;
        background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%) !important;
        background-size: 200% 100% !important;
        animation: dom-shimmer-kf 1.5s infinite linear !important;
        color: transparent !important;
        border-color: transparent !important;
        box-shadow: none !important;
        border-radius: 0.375rem !important;
      }
      .dark .dom-shimmer {
        background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%) !important;
        background-size: 200% 100% !important;
      }
      .dom-shimmer img, .dom-shimmer i {
        opacity: 0 !important;
      }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
    DomSkeletonDirective.styles_injected = true;
  }
}
