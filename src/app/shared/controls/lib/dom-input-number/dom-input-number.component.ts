import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  untracked,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { resolveFormField, FormModel } from '../form-control.utils';

@Component({
  selector: 'dom-input-number',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, DomErrorComponent, FormField],
  templateUrl: './dom-input-number.component.html',
})
export class DomInputNumberComponent<T extends FormModel = FormModel> {
  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement>;

  readonly form          = input<FieldTree<T>>();
  readonly form_group    = input<FormGroup>();
  readonly form_control  = input.required<Extract<keyof T, string>>();
  readonly label         = input<string>('');
  readonly placeholder   = input<string>('');
  readonly hint          = input<string>();
  readonly is_readonly   = input<boolean>(false);
  readonly is_disabled   = input<boolean>(false);
  readonly mode          = input<'integer' | 'decimal'>('integer');
  readonly min           = input<number>();
  readonly max           = input<number>();
  readonly step          = input<number>(1);
  readonly decimal_places = input<number>(2);

  readonly on_change = output<any>();
  readonly on_blur   = output<any>();

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
        if (this.is_disabled()) {
          ctrl.disable({ emitEvent: false });
        } else {
          ctrl.enable({ emitEvent: false });
        }
      }
    });

    effect(() => {
      const el = this.inputEl?.nativeElement;
      if (el) {
        const minVal = this.min();
        if (minVal !== undefined && minVal !== null) {
          el.min = String(minVal);
        } else {
          el.removeAttribute('min');
        }

        const maxVal = this.max();
        if (maxVal !== undefined && maxVal !== null) {
          el.max = String(maxVal);
        } else {
          el.removeAttribute('max');
        }

        el.readOnly = this.is_readonly();
      }
    });
  }

  onBlur(): void {
    const f = this.field();
    if (f) {
      if (this.mode() === 'decimal' && f.value() != null) {
        const parsed = parseFloat(f.value() as any);
        if (!isNaN(parsed)) {
          f.value.set(parseFloat(parsed.toFixed(this.decimal_places())) as any);
        }
      }
      f.markAsTouched();
      this.on_blur.emit(f.value());
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        if (this.mode() === 'decimal' && ctrl.value != null) {
          const parsed = parseFloat(ctrl.value);
          if (!isNaN(parsed)) {
            ctrl.setValue(parseFloat(parsed.toFixed(this.decimal_places())), { emitEvent: false });
          }
        }
        ctrl.markAsTouched();
        this.on_blur.emit(ctrl.value);
      }
    }
  }
}
