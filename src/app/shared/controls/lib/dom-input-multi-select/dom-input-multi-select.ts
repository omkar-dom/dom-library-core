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
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { resolveFormField, FormModel } from '../form-control.utils';

@Component({
  selector: 'dom-multi-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DomErrorComponent,
  ],
  templateUrl: './dom-input-multi-select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomMultiSelectComponent<T extends Record<string, unknown>, F extends FormModel = FormModel> {
  readonly ALL_VALUE = '__all__';

  //--------------------------- Inputs ---------------------------  
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

  // --------------------------- Outputs ---------------------------  
  readonly on_change = output<T[]>();

  // --------------------------- State ---------------------------  
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
    return Array.isArray(value) && (value as any[]).filter((v: any) => v !== this.ALL_VALUE).length > 0;
  });

  // --------------------------- Derived ---------------------------  
  readonly allSelected = computed(() => {
    const value: unknown[] = (this.currentValue() as any) ?? [];
    const opts = this.dynamic_options();
    const realSelected = value.filter((v) => v !== this.ALL_VALUE);
    return opts.length > 0 && opts.every((opt) => realSelected.includes(opt[this.id_property()]));
  });

  readonly selectedTitlesText = computed(() => {
    const value: unknown[] = (this.currentValue() as any) ?? [];
    const realSelectedIds = value.filter((v) => v !== this.ALL_VALUE);
    if (realSelectedIds.length === 0) return '';
    
    const opts = this.dynamic_options();
    const selectedTitles = opts
      .filter((opt) => realSelectedIds.includes(opt[this.id_property()]))
      .map((opt) => String(opt[this.title_property()]));
      
    if (selectedTitles.length === opts.length && opts.length > 0) {
      return 'All Selected';
    }
    return selectedTitles.join(', ');
  });

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
          if (Array.isArray(val)) {
            const selectedOptions = this.options().filter((opt) =>
              (val as any[]).includes(opt[this.id_property()]),
            );
            this.on_change.emit(selectedOptions);
          }
        });
      }
    });

    effect((onCleanup) => {
      const ctrl = this.legacyControl();
      if (ctrl) {
        // Init value
        const val = ctrl.value;
        if (Array.isArray(val)) {
          const selectedOptions = this.options().filter((opt) =>
            (val as any[]).includes(opt[this.id_property()]),
          );
          this.on_change.emit(selectedOptions);
        }

        const sub = ctrl.valueChanges.subscribe(v => {
          if (Array.isArray(v)) {
            const selectedOptions = this.options().filter((opt) =>
              (v as any[]).includes(opt[this.id_property()]),
            );
            this.on_change.emit(selectedOptions);
          }
        });

        if (this.is_disabled()) {
          ctrl.disable({ emitEvent: false });
        } else {
          ctrl.enable({ emitEvent: false });
        }

        onCleanup(() => sub.unsubscribe());
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

  isSelected(option: T): boolean {
    const value = this.currentValue();
    if (!Array.isArray(value)) return false;
    return (value as any[]).includes(option[this.id_property()]);
  }

  toggleOption(option: T): void {
    if (this.is_disabled()) return;
    const optionId = option[this.id_property()];
    const currentValue: unknown[] = (this.currentValue() as any) ?? [];
    let nextValue = currentValue.filter((v) => v !== this.ALL_VALUE);
    
    if (nextValue.includes(optionId)) {
      nextValue = nextValue.filter((id) => id !== optionId);
    } else {
      nextValue = [...nextValue, optionId];
    }
    
    const allIds = this.dynamic_options().map((opt) => opt[this.id_property()]);
    const allRealSelected = allIds.length > 0 && allIds.every((id) => nextValue.includes(id));
    
    const finalValue = allRealSelected ? [this.ALL_VALUE, ...nextValue] : nextValue;
    
    const f = this.field();
    if (f) {
      f.value.set(finalValue as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(finalValue);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    
    const selectedOptions = this.options().filter((opt) =>
      finalValue.includes(opt[this.id_property()]),
    );
    this.on_change.emit(selectedOptions);
  }

  toggleAll(): void {
    if (this.is_disabled()) return;
    const allIds = this.dynamic_options().map((opt) => opt[this.id_property()]);
    let finalValue: unknown[];
    
    if (this.allSelected()) {
      finalValue = [];
    } else {
      finalValue = [this.ALL_VALUE, ...allIds];
    }
    
    const f = this.field();
    if (f) {
      f.value.set(finalValue as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(finalValue);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    
    const selectedOptions = this.options().filter((opt) =>
      finalValue.includes(opt[this.id_property()]),
    );
    this.on_change.emit(selectedOptions);
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.is_disabled()) return;
    const f = this.field();
    if (f) {
      f.value.set([] as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue([]);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    this.on_change.emit([]);
    this.searchQuery.set('');
  }
}
