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
export class DomMultiSelectComponent<T extends Record<string, unknown>> {
  readonly ALL_VALUE = '__all__';

  //--------------------------- Inputs ---------------------------  
  readonly form_group = input.required<FormGroup>();
  readonly form_control = input.required<string>();
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

  readonly control = computed(
    () => this.form_group()?.controls[this.form_control()] as FormControl,
  );
  readonly is_required = computed(() =>
    this.form_group()?.controls[this.form_control()]?.hasValidator(Validators.required),
  );

  readonly hasValue = computed(() => {
    const value = this.control()?.value;
    return Array.isArray(value) && value.filter((v) => v !== this.ALL_VALUE).length > 0;
  });

  // --------------------------- Derived ---------------------------  
  readonly allSelected = computed(() => {
    const value: unknown[] = this.control()?.value ?? [];
    const opts = this.dynamic_options();
    const realSelected = value.filter((v) => v !== this.ALL_VALUE);
    return opts.length > 0 && opts.every((opt) => realSelected.includes(opt[this.id_property()]));
  });

  readonly selectedTitlesText = computed(() => {
    const value: unknown[] = this.control()?.value ?? [];
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

  isSelected(option: T): boolean {
    const value = this.control().value;
    if (!Array.isArray(value)) return false;
    return value.includes(option[this.id_property()]);
  }

  toggleOption(option: T): void {
    if (this.is_disabled()) return;
    const optionId = option[this.id_property()];
    const currentValue: unknown[] = this.control().value ?? [];
    let nextValue = currentValue.filter((v) => v !== this.ALL_VALUE);
    
    if (nextValue.includes(optionId)) {
      nextValue = nextValue.filter((id) => id !== optionId);
    } else {
      nextValue = [...nextValue, optionId];
    }
    
    const allIds = this.dynamic_options().map((opt) => opt[this.id_property()]);
    const allRealSelected = allIds.length > 0 && allIds.every((id) => nextValue.includes(id));
    
    const finalValue = allRealSelected ? [this.ALL_VALUE, ...nextValue] : nextValue;
    this.control().setValue(finalValue);
    this.control().markAsTouched();
    
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
    
    this.control().setValue(finalValue);
    this.control().markAsTouched();
    
    const selectedOptions = this.options().filter((opt) =>
      finalValue.includes(opt[this.id_property()]),
    );
    this.on_change.emit(selectedOptions);
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.is_disabled()) return;
    this.control().setValue([]);
    this.control().markAsTouched();
    this.on_change.emit([]);
    this.searchQuery.set('');
  }
}
