import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomErrorComponent } from '../dom-error/dom-error.component';

@Component({
  selector: 'dom-inputarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DomErrorComponent],
  templateUrl: './dom-input-textarea.component.html',
})
export class DomTextareaComponent {
  readonly form_group   = input.required<FormGroup>();
  readonly form_control = input.required<string>();
  readonly label        = input<string>('');
  readonly placeholder  = input<string>('');
  readonly hint         = input<string>();
  readonly is_readonly  = input<boolean>(false);
  readonly is_disabled  = input<boolean>(false);
  readonly rows         = input<number>(3);
  readonly max_length   = input<number>();
  readonly auto_resize  = input<boolean>(true);

  readonly on_change = output<any>();
  readonly on_blur   = output<any>();

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
      ctrl.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((val) => this.on_change.emit(val));
    });
  }
}
