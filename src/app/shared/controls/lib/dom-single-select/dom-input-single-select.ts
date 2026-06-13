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
  untracked,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { resolveFormField, FormModel } from '../form-control.utils';

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
export class DomSingleSelectComponent<T extends Record<string, unknown>, F extends FormModel = FormModel> {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  readonly form = input<any>();
  readonly form_group = input<FormGroup>();
  readonly form_control = input.required<Extract<keyof F, string>>();
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

  readonly legacyControl = computed(() => {
    const group = this.form_group();
    const ctrlName = this.form_control() as string;
    return group?.get(ctrlName) as FormControl;
  });

  protected readonly resolvedFormField = resolveFormField(this.form, this.form_control);
  protected readonly field = computed(() => {
    const resolved = this.resolvedFormField();
    return resolved ? resolved() : undefined;
  });

  readonly is_required = computed(() => {
    const f = this.field();
    if (f) return f.required();
    return this.legacyControl()?.hasValidator(Validators.required) ?? false;
  });

  readonly currentValue = computed(() => {
    const f = this.field();
    if (f) return f.value();
    return this.legacyControl()?.value;
  });

  readonly hasValue = computed(() => {
    const value = this.currentValue();
    return value !== null && value !== undefined && value !== '';
  });

  readonly selectedTitle = computed(() => {
    const val = this.currentValue();
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
      const f = this.field();
      if (f) {
        const val = f.value();
        untracked(() => {
          this.on_change.emit(val);
        });
      }
    });

    effect(() => {
      const ctrl = this.legacyControl();
      if (ctrl) {
        const val = ctrl.value;
        untracked(() => {
          this.on_change.emit(val);
        });
      }
    });

    effect(() => {
      const ctrl = this.legacyControl();
      if (ctrl) {
        if (this.is_disabled()) {
          ctrl.disable({ emitEvent: false });
        } else {
          ctrl.enable({ emitEvent: false });
        }
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
    const f = this.field();
    if (f) {
      f.value.set(value as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(value);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    this.on_change.emit(option);
    this.panelOpen.set(false);
    this.searchQuery.set('');
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.is_disabled()) return;
    const f = this.field();
    if (f) {
      f.value.set(null as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(null);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    this.on_change.emit(null);
    this.panelOpen.set(false);
    this.searchQuery.set('');
  }
}
