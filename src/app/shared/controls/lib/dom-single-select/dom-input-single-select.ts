import {
  Component,
  input,
  computed,
  signal,
  effect,
  ChangeDetectionStrategy,
  output,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomErrorComponent } from '../dom-error/dom-error.component';

@Component({
  selector: 'dom-single-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DomErrorComponent,
  ],
  templateUrl: './dom-input-single-select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomSingleSelectComponent<T extends Record<string, unknown>> {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  readonly form_group = input.required<FormGroup>();
  readonly form_control = input.required<string>();
  readonly options = input.required<T[]>();

  readonly id_property = input<string>('id');
  readonly title_property = input<string>('title');

  readonly label = input<string>('');
  readonly placeholder = input<string>('Search or select...');
  readonly hint = input<string>();
  readonly is_disabled = input<boolean>(false);

  // ------------------------------------ Outputs ------------------------------------
  readonly on_change = output<any>();

  // ------------------------------------ State ------------------------------------
  readonly searchQuery = signal('');
  readonly dynamic_options = signal<T[]>([]);
  readonly panelOpen = signal(false);

  private readonly elementRef = inject(ElementRef);

  readonly control = computed(
    () => this.form_group()?.controls[this.form_control()] as FormControl,
  );
  readonly is_required = computed(() =>
    this.form_group()?.controls[this.form_control()]?.hasValidator(Validators.required),
  );

  readonly hasValue = computed(() => {
    const value = this.control()?.value;
    return value !== null && value !== undefined && value !== '';
  });

  readonly selectedTitle = computed(() => {
    const val = this.control()?.value;
    if (val === null || val === undefined || val === '') return '';
    const selected = this.dynamic_options().find((opt) => opt[this.id_property()] === val);
    return selected ? String(selected[this.title_property()]) : '';
  });

  // ------------------------------------ Derived ------------------------------------
  readonly filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const opts = this.dynamic_options();

    if (!query) return opts;
    return opts.filter((opt) =>
      String(opt[this.title_property()] ?? '')
        .toLowerCase()
        .includes(query),
    );
  });

  constructor() {
    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      if (this.is_disabled()) {
        ctrl.disable({ emitEvent: false });
      } else {
        ctrl.enable({ emitEvent: false });
      }
    });

    effect(() => {
      if (this.options().length > 0) {
        this.dynamic_options.set(this.options());
      } else {
        this.dynamic_options.set([]);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.panelOpen.set(false);
      this.searchQuery.set('');
    }
  }

  togglePanel(event: Event): void {
    event.stopPropagation();
    if (this.is_disabled()) return;
    this.panelOpen.update((open) => !open);
    if (!this.panelOpen()) {
      this.searchQuery.set('');
    }
  }

  selectOption(option: T): void {
    if (this.is_disabled()) return;
    const value = option[this.id_property()];
    this.control().setValue(value);
    this.control().markAsTouched();
    this.on_change.emit(option);
    this.panelOpen.set(false);
    this.searchQuery.set('');
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.is_disabled()) return;
    this.control().setValue(null);
    this.control().markAsTouched();
    this.on_change.emit(null);
    this.panelOpen.set(false);
    this.searchQuery.set('');
  }
}
