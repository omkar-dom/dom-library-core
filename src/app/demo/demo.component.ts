import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormRoot } from '@angular/forms/signals';
import {
  DomInputComponent,
  DomInputNumberComponent,
  DomTextareaComponent,
  DomCheckboxComponent,
  DomToggleComponent,
  DomRadioComponent,
  DomSingleSelectComponent,
  DomMultiSelectComponent,
  DomDatePickerComponent,
  DomDateTimePickerComponent,
  DomDrawerComponent,
  DomDialogComponent,
  DomSelectButtonComponent,
  DomCarouselComponent,
  DomToastService,
  DomTooltipDirective,
  DomSkeletonDirective,
  DomMobileNumberComponent,
  DomNameBuddyComponent,
} from '../shared/controls/public-api';

import {
  DEPARTMENT_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  SKILL_OPTIONS,
  createEmptyEmployee,
  createEmptyEmergencyContact,
  Employee,
} from './employee.model';
import { applyEmployeeValidators } from './employee-form.schema';

@Component({
  selector: 'app-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormRoot,
    DomInputComponent,
    DomInputNumberComponent,
    DomCheckboxComponent,
    DomRadioComponent,
    DomSingleSelectComponent,
    DomMultiSelectComponent,
    DomDatePickerComponent,
    DomDrawerComponent,
    DomDialogComponent,
    DomSelectButtonComponent,
    DomCarouselComponent,
    DomTooltipDirective,
    DomSkeletonDirective,
    DomMobileNumberComponent,
  ],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  private readonly toast = inject(DomToastService);

  readonly today = new Date();

  // Interactive Playgrounds State
  readonly active_tab = signal<'form' | 'overlays' | 'utilities'>('form');
  readonly drawer_open = signal<boolean>(false);
  readonly drawer_position = signal<'left' | 'right' | 'top' | 'bottom'>('right');

  readonly dialog_open = signal<boolean>(false);
  readonly dialog_size = signal<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');

  readonly profile_loading = signal<boolean>(false);

  readonly select_button_layout_options = [
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' },
  ];

  readonly carousel_slides = [
    { title: 'DOM Library V1.1', desc: 'Enterprise Grade Angular Controls', bg: 'from-indigo-600 to-indigo-800' },
    { title: 'Rich Interaction Sheets', desc: 'Focus-trapped slide drawers & dialogs', bg: 'from-sky-500 to-blue-700' },
    { title: 'Hardware Accelerated', desc: 'High frame-rate carousel transitions', bg: 'from-emerald-500 to-teal-700' },
  ];

  // Options for form selects and radios
  protected readonly departmentOptions = [...DEPARTMENT_OPTIONS];
  protected readonly skillOptions = [...SKILL_OPTIONS];
  protected readonly employmentTypeOptions = [...EMPLOYMENT_TYPE_OPTIONS];

  // Preferences form for setting horizontal/vertical preference
  protected readonly prefModel = signal({ layout_mode: 'vertical' });
  protected readonly prefForm = form(this.prefModel);

  // Employee Form
  protected readonly employeeModel = signal<Employee>(createEmptyEmployee());
  protected readonly employeeForm = form(this.employeeModel, applyEmployeeValidators);

  readonly layout = computed(() => this.prefModel().layout_mode as 'horizontal' | 'vertical');

  protected addEmergencyContact(): void {
    this.employeeModel.update((employee) => ({
      ...employee,
      emergencyContacts: [...employee.emergencyContacts, createEmptyEmergencyContact()],
    }));
  }

  protected removeEmergencyContact(index: number): void {
    this.employeeModel.update((employee) => ({
      ...employee,
      emergencyContacts: employee.emergencyContacts.filter((_, i) => i !== index),
    }));
  }

  // Action Toast Triggers
  triggerToast(type: 'success' | 'error' | 'warning' | 'info'): void {
    if (type === 'success') {
      this.toast.show('Settings saved successfully!', {
        type: 'success',
        duration: 4000,
      });
    } else if (type === 'error') {
      this.toast.show('Database transaction failed. Please retry.', {
        type: 'error',
        duration: 5000,
        action: {
          label: 'Retry',
          callback: () => {
            this.toast.show('Retrying transaction...', { type: 'info' });
          },
        },
      });
    } else if (type === 'warning') {
      this.toast.show('Warning: Document deleted permanently.', {
        type: 'warning',
        duration: 6000,
        action: {
          label: 'Undo',
          callback: () => {
            this.toast.show('Restored document state!', { type: 'success' });
          },
        },
      });
    } else {
      this.toast.show('Info: System upgrade scheduled for tonight.', {
        type: 'info',
        duration: 4000,
      });
    }
  }

  // Slide Sheet Triggers
  openDrawer(position: 'left' | 'right' | 'top' | 'bottom'): void {
    this.drawer_position.set(position);
    this.drawer_open.set(true);
  }

  // Modal Triggers
  openDialog(size: 'sm' | 'md' | 'lg' | 'xl' | 'full'): void {
    this.dialog_size.set(size);
    this.dialog_open.set(true);
  }

  toggleLayout(): void {
    const current = this.prefModel().layout_mode;
    this.prefModel.set({ layout_mode: current === 'horizontal' ? 'vertical' : 'horizontal' });
  }

  submit(): void {
    this.employeeForm().markAsTouched();
    if (this.employeeForm().invalid()) {
      this.toast.show('Please fix the errors in the form.', { type: 'error' });
      return;
    }
    this.toast.show('Form Submitted Successfully!', { type: 'success' });
    console.log('Form Values:', this.employeeModel());
  }

  reset(): void {
    this.employeeModel.set(createEmptyEmployee());
    this.employeeForm().reset();
  }
}
