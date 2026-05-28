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
import moment from 'moment';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import {
  DateValueFormat,
  formatForValue,
  getDateBoundsFromControl,
  parseToDate,
} from '../date-format.util';

@Component({
  selector: 'dom-datetime-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DomErrorComponent,
  ],
  templateUrl: './dom-input-date-time.html',
})
export class DomDateTimePickerComponent {
  readonly form_group = input.required<FormGroup>();
  readonly form_control = input.required<string>();
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly hint = input<string>();
  readonly is_readonly = input<boolean>(false);
  readonly is_disabled = input<boolean>(false);
  readonly format = input<DateValueFormat>('iso');
  readonly custom_format = input<string>();

  readonly on_change = output<string | null>();
  readonly on_blur = output<string | null>();

  readonly is_required = computed(() => this.control().hasValidator(Validators.required));

  readonly control = computed<FormControl>(
    () => this.form_group().get(this.form_control()) as FormControl,
  );

  readonly pickerDate = signal<Date | null>(null);
  readonly pickerTime = signal('00:00');

  readonly dateBounds = computed(() =>
    getDateBoundsFromControl(this.control(), this.format(), this.custom_format(), true),
  );

  readonly minDate = computed(() => this.dateBounds().min);
  readonly maxDate = computed(() => this.dateBounds().max);

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
      const fmt = this.format();
      const customFmt = this.custom_format();
      if (!ctrl) return;
      const date = parseToDate(ctrl.value, fmt, customFmt, true);
      this.pickerDate.set(date);
      this.pickerTime.set(date ? moment(date).format('HH:mm') : '00:00');
    });

    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      ctrl.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((val) => this.on_change.emit(val));
    });
  }

  onHtmlDateChange(event: Event): void {
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
      : '';
    this.control().setValue(formatted, { emitEvent: true });
    this.pickerDate.set(date);
    if (date) {
      this.pickerTime.set(moment(date).format('HH:mm'));
    }
  }
}
