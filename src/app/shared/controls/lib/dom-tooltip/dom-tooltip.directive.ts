import { Directive, input, ElementRef, HostListener, Renderer2, inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '[domTooltip]',
  standalone: true,
})
export class DomTooltipDirective implements OnDestroy {
  readonly text = input<string>('', { alias: 'domTooltip' });
  readonly position = input<'top' | 'bottom' | 'left' | 'right'>('top', { alias: 'tooltip_position' });

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private tooltipEl: HTMLElement | null = null;

  @HostListener('mouseenter')
  @HostListener('focusin')
  show(): void {
    if (!this.text()) return;

    this.createTooltip();
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  hide(): void {
    this.removeTooltip();
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }

  private createTooltip(): void {
    this.removeTooltip();

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipEl, this.renderer.createText(this.text()));

    // Stylize the tooltip using Tailwind/Vanilla utilities
    const classes = [
      'fixed',
      'z-[10000]',
      'px-2.5',
      'py-1.5',
      'text-xs',
      'font-medium',
      'text-white',
      'bg-slate-900/90',
      'dark:bg-slate-800/95',
      'backdrop-blur-sm',
      'rounded-md',
      'shadow-md',
      'pointer-events-none',
      'transition-all',
      'duration-200',
      'opacity-0',
      'scale-95',
      'border',
      'border-white/10'
    ];
    for (const c of classes) {
      this.renderer.addClass(this.tooltipEl, c);
    }

    this.renderer.appendChild(document.body, this.tooltipEl);

    // Trigger double layout tick to compute correct dimensions before positioning
    this.positionTooltip();

    requestAnimationFrame(() => {
      if (this.tooltipEl) {
        this.renderer.removeClass(this.tooltipEl, 'opacity-0');
        this.renderer.removeClass(this.tooltipEl, 'scale-95');
        this.renderer.addClass(this.tooltipEl, 'opacity-100');
        this.renderer.addClass(this.tooltipEl, 'scale-100');
      }
    });
  }

  private positionTooltip(): void {
    if (!this.tooltipEl) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();

    let top = 0;
    let left = 0;
    const offset = 8;

    switch (this.position()) {
      case 'top':
        top = hostRect.top - tooltipRect.height - offset;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + offset;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + offset;
        break;
    }

    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
  }

  private removeTooltip(): void {
    if (this.tooltipEl) {
      const el = this.tooltipEl;
      this.tooltipEl = null;
      
      this.renderer.removeClass(el, 'opacity-100');
      this.renderer.addClass(el, 'opacity-0');
      
      setTimeout(() => {
        if (el && el.parentNode) {
          this.renderer.removeChild(document.body, el);
        }
      }, 150);
    }
  }
}
