import { Component, input, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomErrorComponent } from '../dom-error/dom-error.component';

@Component({
  selector: 'dom-name-buddy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DomErrorComponent],
  templateUrl: './dom-name-buddy.component.html',
  styleUrl: './dom-name-buddy.component.css',
})
export class DomNameBuddyComponent {
  readonly form_group = input.required<FormGroup>();
  readonly first_name_control = input.required<string>();
  readonly last_name_control = input.required<string>();
  readonly middle_name_control = input<string>('');
  readonly salutation_control = input<string>('');

  readonly hide_salutation = input<boolean>(false);
  readonly hide_middle_name = input<boolean>(false);
  readonly label = input<string>('Full Name');

  // Salutation Dropdown Options
  readonly salutation_options = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];

  // Resolve form controls dynamically
  readonly first_ctrl = computed<FormControl>(
    () => this.form_group().get(this.first_name_control()) as FormControl
  );

  readonly last_ctrl = computed<FormControl>(
    () => this.form_group().get(this.last_name_control()) as FormControl
  );

  readonly middle_ctrl = computed<FormControl | null>(() => {
    const name = this.middle_name_control();
    return name ? (this.form_group().get(name) as FormControl) : null;
  });

  readonly salutation_ctrl = computed<FormControl | null>(() => {
    const name = this.salutation_control();
    return name ? (this.form_group().get(name) as FormControl) : null;
  });

  // Required validations mapping to draw asterisks
  readonly is_first_required = computed(() => {
    const ctrl = this.first_ctrl();
    return ctrl ? ctrl.hasValidator(Validators.required) : false;
  });

  readonly is_last_required = computed(() => {
    const ctrl = this.last_ctrl();
    return ctrl ? ctrl.hasValidator(Validators.required) : false;
  });

  readonly is_middle_required = computed(() => {
    const ctrl = this.middle_ctrl();
    return ctrl ? ctrl.hasValidator(Validators.required) : false;
  });

  readonly is_salutation_required = computed(() => {
    const ctrl = this.salutation_ctrl();
    return ctrl ? ctrl.hasValidator(Validators.required) : false;
  });

  constructor() {
    // Automatically disable/enable controls dynamically if their visibility toggles change!
    effect(() => {
      const sCtrl = this.salutation_ctrl();
      if (sCtrl) {
        if (this.hide_salutation()) {
          sCtrl.disable({ emitEvent: false });
        } else {
          sCtrl.enable({ emitEvent: false });
        }
      }
    });

    effect(() => {
      const mCtrl = this.middle_ctrl();
      if (mCtrl) {
        if (this.hide_middle_name()) {
          mCtrl.disable({ emitEvent: false });
        } else {
          mCtrl.enable({ emitEvent: false });
        }
      }
    });
  }
}
