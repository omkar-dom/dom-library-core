import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { domDateMax, domDateMin } from '../shared/controls/lib/date-format.util';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    DomTooltipDirective,
    DomSkeletonDirective,
    DomMobileNumberComponent,
    DomNameBuddyComponent,
  ],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  private readonly fb = inject(FormBuilder);
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

  // Primary reactive form featuring Name Buddy and Mobile Number
  readonly form = this.fb.group({
    salutation:    ['Mr.'],
    first_name:    ['', [Validators.required, Validators.maxLength(30)]],
    middle_name:   [''],
    last_name:     ['', [Validators.required, Validators.maxLength(30)]],
    email:         ['', [Validators.required, Validators.email]],
    password:      ['', [Validators.required, Validators.minLength(8)]],
    mobile_phone:  ['', [Validators.required]], // Managed by DomMobileNumberComponent
    age:           [null as number | null, [Validators.required, Validators.min(18), Validators.max(99)]],
    price:         [null as number | null, [Validators.required, Validators.min(0)]],
    description:   ['', [Validators.required, Validators.maxLength(300)]],
    agree:         [false, [Validators.requiredTrue]],
    notifications: [[] as string[], [Validators.required]],
    language:      ['', [Validators.required]],
    active:        [false, [Validators.required]],
    gender:        ['', [Validators.required]],
    country:       [null as number | null, [Validators.required]],
    layout_mode:   ['vertical'],
    birth_date: [
      '',
      [
        Validators.required,
        domDateMin('1900-01-01'),
        domDateMax('2026-05-20'),
      ],
    ],
    appointment: [
      '',
      [
        Validators.required,
        domDateMin('2026-05-20 00:00', { isDateTime: true }),
        domDateMax('2026-05-27 23:59', { isDateTime: true }),
      ],
    ],
  });

  readonly layout = computed(() => this.form.get('layout_mode')?.value as 'horizontal' | 'vertical' || 'vertical');

  readonly notificationOptions = [
    { id: 'Email',    title: 'Email'    },
    { id: 'SMS',      title: 'SMS'      },
    { id: 'Push',     title: 'Push'     },
    { id: 'WhatsApp', title: 'WhatsApp' }
  ];

  readonly genderOptions = [
    { label: 'Male',   value: 'male'   },
    { label: 'Female', value: 'female' },
    { label: 'Other',  value: 'other'  },
  ];

  readonly languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
  ];

  readonly countryOptions = computed(() => {
    const countries: { code: number; title: string }[] = [];
    for (let i = 0; i < 20; i++) {
      countries.push({
        code: i,
        title: `Country ${i + 1}`,
      });
    }
    return countries;
  });

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
    const current = this.form.get('layout_mode')?.value;
    this.form.get('layout_mode')?.setValue(current === 'horizontal' ? 'vertical' : 'horizontal');
  }

  onCountryChange(event: number): void {
    console.log('Country changed:', event);
  }

  onLanguageChange(event: any): void {
    console.log('Language changed:', event);
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.toast.show('Form Submitted Successfully!', { type: 'success' });
      console.log('Form Values:', this.form.value);
    } else {
      this.toast.show('Please fix the errors in the form.', { type: 'error' });
    }
  }

  reset(): void {
    this.form.reset({
      salutation:    'Mr.',
      first_name:    '',
      middle_name:   '',
      last_name:     '',
      email:         '',
      password:      '',
      mobile_phone:  '',
      age:           null,
      price:         null,
      description:   '',
      agree:         false,
      notifications: [],
      active:        false,
      gender:        '',
      country:       null,
      birth_date:    '',
      appointment:   '',
      layout_mode:   'vertical',
    });
  }
}
