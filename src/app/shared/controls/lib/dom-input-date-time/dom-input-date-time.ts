import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import {
  DateValueFormat,
  formatForValue,
  parseToDate,
} from '../date-format.util';
import { resolveFormField, FormModel } from '../form-control.utils';

@Component({
  selector: 'dom-datetime-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DomErrorComponent,
  ],
  templateUrl: './dom-input-date-time.html',
})
export class DomDateTimePickerComponent<T extends FormModel = FormModel> {
  readonly form = input<any>();
  readonly form_group = input<FormGroup>();
  readonly form_control = input.required<Extract<keyof T, string>>();
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly hint = input<string>();
  readonly is_readonly = input<boolean>(false);
  readonly is_disabled = input<boolean>(false);
  readonly format = input<DateValueFormat>('iso');
  readonly custom_format = input<string>();

  readonly on_change = output<string | null>();
  readonly on_blur = output<string | null>();

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

  readonly pickerDate = signal<Date | null>(null);
  readonly pickerTime = signal('00:00');

  readonly minDate = computed(() => {
    const f = this.field();
    const minVal = f?.min?.();
    return minVal ? parseToDate(minVal, this.format(), this.custom_format(), true) : null;
  });

  readonly maxDate = computed(() => {
    const f = this.field();
    const maxVal = f?.max?.();
    return maxVal ? parseToDate(maxVal, this.format(), this.custom_format(), true) : null;
  });

  readonly htmlInputValue = computed(() => {
    const date = this.pickerDate();
    return date ? moment(date).format('YYYY-MM-DD') : '';
  });

  readonly htmlMinDate = computed(() => {
    const date = this.minDate();
    return date ? moment(date).format('YYYY-MM-DD') : null;
  });

  readonly htmlMaxDate = computed(() => {
    const date = this.maxDate();
    return date ? moment(date).format('YYYY-MM-DD') : null;
  });

  constructor() {
    effect(() => {
      const f = this.field();
      if (f) {
        const val = f.value();
        const fmt = this.format();
        const customFmt = this.custom_format();
        const date = parseToDate(val, fmt, customFmt, true);
        this.pickerDate.set(date);
        this.pickerTime.set(date ? moment(date).format('HH:mm') : '00:00');
        untracked(() => {
          this.on_change.emit(val as any);
        });
      }
    });

    effect((onCleanup) => {
      const ctrl = this.legacyControl();
      if (ctrl) {
        // Init value
        const val = ctrl.value;
        const fmt = this.format();
        const customFmt = this.custom_format();
        const date = parseToDate(val, fmt, customFmt, true);
        this.pickerDate.set(date);
        this.pickerTime.set(date ? moment(date).format('HH:mm') : '00:00');

        const sub = ctrl.valueChanges.subscribe(v => {
          const d = parseToDate(v, fmt, customFmt, true);
          this.pickerDate.set(d);
          this.pickerTime.set(d ? moment(d).format('HH:mm') : '00:00');
          this.on_change.emit(v);
        });

        if (this.is_disabled()) {
          ctrl.disable({ emitEvent: false });
        } else {
          ctrl.enable({ emitEvent: false });
        }

        onCleanup(() => sub.unsubscribe());
      }
    });
  }

  onHtmlDateChange(event: Event): void {
    if (this.is_disabled()) return;
    const val = (event.target as HTMLInputElement).value;
    if (!val) {
      this.setFormattedValue(null);
      return;
    }
    const date = moment(val, 'YYYY-MM-DD').toDate();
    const merged = this.mergeDateAndTime(date, this.pickerTime() || '00:00');
    this.setFormattedValue(merged);
  }

  onTimeInput(event: Event): void {
    if (this.is_disabled()) return;
    const time = (event.target as HTMLInputElement).value;
    if (!time) {
      return;
    }

    this.pickerTime.set(time);

    const base = this.pickerDate() ?? new Date();
    const merged = this.mergeDateAndTime(base, time);
    this.setFormattedValue(merged);
  }

  private mergeDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map((part) => Number(part));
    return moment(date)
      .hour(Number.isFinite(hours) ? hours : 0)
      .minute(Number.isFinite(minutes) ? minutes : 0)
      .second(0)
      .millisecond(0)
      .toDate();
  }

  private setFormattedValue(date: Date | null): void {
    const formatted = date
      ? formatForValue(date, this.format(), this.custom_format(), true)
      : null;
    
    const f = this.field();
    if (f) {
      f.value.set(formatted as any);
      f.markAsDirty();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(formatted);
        ctrl.markAsDirty();
      }
    }
    this.pickerDate.set(date);
    if (date) {
      this.pickerTime.set(moment(date).format('HH:mm'));
    }
  }

  onBlur(): void {
    const f = this.field();
    if (f) {
      f.markAsTouched();
      this.on_blur.emit(f.value() as any);
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.markAsTouched();
        this.on_blur.emit(ctrl.value);
      }
    }
  }
}
