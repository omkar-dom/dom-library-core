import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center-left'
  | 'center-right';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  position: ToastPosition;
  duration: number;
  action?: {
    label: string;
    callback: () => void;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DomToastService {
  readonly toasts = signal<Toast[]>([]);

  show(
    message: string,
    options: {
      type?: ToastType;
      position?: ToastPosition;
      duration?: number;
      action?: {
        label: string;
        callback: () => void;
      };
    } = {}
  ): string {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = {
      id,
      message,
      type: options.type ?? 'info',
      position: options.position ?? 'top-right',
      duration: options.duration ?? 4000,
      action: options.action,
    };

    this.toasts.update((current) => [...current, toast]);

    if (toast.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, toast.duration);
    }

    return id;
  }

  success(message: string, position: ToastPosition = 'top-right', duration = 4000): string {
    return this.show(message, { type: 'success', position, duration });
  }

  error(message: string, position: ToastPosition = 'top-right', duration = 4000): string {
    return this.show(message, { type: 'error', position, duration });
  }

  info(message: string, position: ToastPosition = 'top-right', duration = 4000): string {
    return this.show(message, { type: 'info', position, duration });
  }

  warning(message: string, position: ToastPosition = 'top-right', duration = 4000): string {
    return this.show(message, { type: 'warning', position, duration });
  }

  remove(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
