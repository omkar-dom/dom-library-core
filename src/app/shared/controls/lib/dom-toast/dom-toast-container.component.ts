import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomToastService, Toast, ToastPosition } from './dom-toast.service';

@Component({
  selector: 'dom-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dom-toast-container.component.html',
  styleUrl: './dom-toast-container.component.css',
})
export class DomToastContainerComponent {
  private readonly toastService = inject(DomToastService);

  readonly positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'center-left',
    'center-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  readonly toasts_by_position = computed(() => {
    const list = this.toastService.toasts();
    const groups: Record<ToastPosition, Toast[]> = {
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'center-left': [],
      'center-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [],
    };
    for (const t of list) {
      groups[t.position].push(t);
    }
    return groups;
  });

  remove(id: string): void {
    this.toastService.remove(id);
  }

  handleAction(toast: Toast): void {
    if (toast.action?.callback) {
      toast.action.callback();
    }
    this.remove(toast.id);
  }
}
