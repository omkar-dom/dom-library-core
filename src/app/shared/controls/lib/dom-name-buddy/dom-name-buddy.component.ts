import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { FormModel } from '../form-control.utils';

@Component({
  selector: 'dom-name-buddy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DomErrorComponent, FormField],
  templateUrl: './dom-name-buddy.component.html',
  styleUrl: './dom-name-buddy.component.css',
})
export class DomNameBuddyComponent<T extends FormModel = FormModel> {
  readonly form = input<FieldTree<T>>();
  readonly form_group = input<FormGroup>();
  readonly first_name_control = input.required<Extract<keyof T, string>>();
  readonly last_name_control = input.required<Extract<keyof T, string>>();
  readonly middle_name_control = input<Extract<keyof T, string> | ''>('');
  readonly salutation_control = input<Extract<keyof T, string> | ''>('');

  readonly hide_salutation = input<boolean>(false);
  readonly hide_middle_name = input<boolean>(false);
  readonly label = input<string>('Full Name');

  // Salutation Dropdown Options
  readonly salutation_options = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];

  // Resolve legacy form controls
  readonly legacy_first_control = computed(() => {
    const group = this.form_group();
    const ctrlName = this.first_name_control() as string;
    return group?.get(ctrlName) as FormControl;
  });

  readonly legacy_last_control = computed(() => {
    const group = this.form_group();
    const ctrlName = this.last_name_control() as string;
    return group?.get(ctrlName) as FormControl;
  });

  readonly legacy_middle_control = computed(() => {
    const group = this.form_group();
    const ctrlName = this.middle_name_control() as string;
    return ctrlName ? (group?.get(ctrlName) as FormControl) : null;
  });

  readonly legacy_salutation_control = computed(() => {
    const group = this.form_group();
    const ctrlName = this.salutation_control() as string;
    return ctrlName ? (group?.get(ctrlName) as FormControl) : null;
  });

  // Resolve form fields dynamically
  readonly first_field = computed(() => {
    const f = this.form();
    if (!f) return undefined;
    return (f as any)[this.first_name_control()] as FieldTree<string>;
  });
  readonly is_first_required = computed(() => {
    const f = this.first_field();
    if (f) return f().required();
    return this.legacy_first_control()?.hasValidator(Validators.required) ?? false;
  });

  readonly last_field = computed(() => {
    const f = this.form();
    if (!f) return undefined;
    return (f as any)[this.last_name_control()] as FieldTree<string>;
  });
  readonly is_last_required = computed(() => {
    const f = this.last_field();
    if (f) return f().required();
    return this.legacy_last_control()?.hasValidator(Validators.required) ?? false;
  });

  readonly middle_field = computed(() => {
    const f = this.form();
    const name = this.middle_name_control();
    if (!f || !name) return null;
    return (f as any)[name] as FieldTree<string>;
  });
  readonly is_middle_required = computed(() => {
    const f = this.middle_field();
    if (f) return f()?.required() ?? false;
    return this.legacy_middle_control()?.hasValidator(Validators.required) ?? false;
  });

  readonly salutation_field = computed(() => {
    const f = this.form();
    const name = this.salutation_control();
    if (!f || !name) return null;
    return (f as any)[name] as FieldTree<string>;
  });
  readonly is_salutation_required = computed(() => {
    const f = this.salutation_field();
    if (f) return f()?.required() ?? false;
    return this.legacy_salutation_control()?.hasValidator(Validators.required) ?? false;
  });
}
