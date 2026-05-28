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
import moment from 'moment';
import {
  DateValueFormat,
  formatForValue,
  getDateBoundsFromControl,
  parseToDate,
} from '../date-format.util';

@Component({
  selector: 'dom-date-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DomErrorComponent,
  ],
  templateUrl: './dom-input-date.html',
})
export class DomDatePickerComponent {
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

  readonly dateBounds = computed(() =>
    getDateBoundsFromControl(this.control(), this.format(), this.custom_format(), false),
  );

  readonly minDate = computed(() => this.dateBounds().min);
  readonly maxDate = computed(() => this.dateBounds().max);

  readonly htmlInputValue = computed(() => {
    const date = this.pickerDate();
    if (!date) return '';
    return moment(date).format('YYYY-MM-DD');
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
      this.pickerDate.set(parseToDate(ctrl.value, fmt, customFmt, false));
    });

    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;
      ctrl.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((val) => this.on_change.emit(val));
    });
  }

  onHtmlInputChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    if (!val) {
      this.control().setValue(null);
      this.pickerDate.set(null);
      this.on_change.emit(null);
      return;
    }
    const date = moment(val, 'YYYY-MM-DD').toDate();
    const formatted = formatForValue(date, this.format(), this.custom_format(), false);
    this.control().setValue(formatted);
    this.pickerDate.set(date);
    this.on_change.emit(formatted);
  }
}
