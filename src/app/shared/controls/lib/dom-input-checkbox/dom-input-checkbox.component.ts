import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomErrorComponent } from '../dom-error/dom-error.component';

export interface CheckboxOption {
  id:    string;
  title: string;
  disabled?: boolean;
}

@Component({
  selector: 'dom-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DomErrorComponent],
  templateUrl: './dom-input-checkbox.component.html',
})
export class DomCheckboxComponent {
  readonly form_group      = input.required<FormGroup>();
  readonly form_control    = input.required<string>();
  readonly label           = input<string>('');
  readonly placeholder     = input<string>('');
  readonly hint            = input<string>();
  readonly is_readonly     = input<boolean>(false);
  readonly is_disabled     = input<boolean>(false);
  readonly options         = input<CheckboxOption[]>([]);
  readonly id_property     = input<string>('id');
  readonly title_property  = input<string>('title');
  readonly layout          = input<'vertical' | 'horizontal'>('vertical');

  readonly on_change = output<any>();
  readonly on_blur   = output<any>();

  readonly checked_values = signal<any[]>([]);
  readonly is_required = computed(() => this.control().hasValidator(Validators.required));

  readonly control = computed<FormControl>(
    () =>
      this.form_group().get(this.form_control()) as FormControl ??
      this.form_group().get(this.form_control()!) as FormControl,
  );

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      this.is_disabled()
        ? ctrl.disable({ emitEvent: false })
        : ctrl.enable({ emitEvent: false });
    });

    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      const current = ctrl.value;
      if (Array.isArray(current)) {
        this.checked_values.set(current);
      }
      ctrl.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((val) => {
          if (Array.isArray(val)) {
            this.checked_values.set(val);
          }
          this.on_change.emit(val);
        });
    });
  }

  isChecked(val: any): boolean {
    return this.checked_values().includes(val) && !this.options().find(opt => opt.id === val)?.disabled;
  }

  toggle(val: any): void {
    const current = [...this.checked_values()];
    const idx = current.indexOf(val);
    if (idx > -1) {
      current.splice(idx, 1);
    } else {
      current.push(val);
    }
    this.checked_values.set(current);
    this.control().setValue(current);
    this.on_change.emit(current);
  }
}
