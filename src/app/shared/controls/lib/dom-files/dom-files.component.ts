import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  ViewChild,
  ElementRef,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomErrorComponent } from '../dom-error/dom-error.component';
import { resolveFormField, FormModel } from '../form-control.utils';

@Component({
  selector: 'dom-files',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, DomErrorComponent],
  templateUrl: './dom-files.component.html',
})
export class DomFilesComponent<T extends FormModel = FormModel> {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  readonly form = input<any>();
  readonly form_group = input<FormGroup>();
  readonly form_control = input<any>();
  readonly control_name = input<string>('');
  readonly label         = input<string>('');
  readonly placeholder   = input<string>('');
  readonly hint          = input<string>();
  readonly is_readonly   = input<boolean>(false);
  readonly is_disabled   = input<boolean>(false);
  readonly accept        = input<string>('*');
  readonly multiple      = input<boolean>(false);
  readonly max_size_mb   = input<number>(5);
  readonly show_preview  = input<boolean>(true);

  readonly on_change = output<any>();
  readonly on_blur   = output<any>();

  readonly selected_files = signal<File[]>([]);
  readonly preview_urls   = signal<string[]>([]);
  readonly has_error      = signal(false);
  readonly error_message  = signal('');
  readonly drag_over      = signal(false);

  readonly non_image_files = computed(() =>
    this.selected_files().filter((f) => !f.type.startsWith('image/')),
  );

  readonly legacyControl = computed(() => {
    const fc = this.form_control();
    if (fc instanceof FormControl) {
      return fc;
    }
    const group = this.form_group();
    if (group) {
      if (typeof fc === 'string' && fc) {
        return group.get(fc) as FormControl;
      }
      const name = this.control_name();
      if (name) {
        return group.get(name) as FormControl;
      }
    }
    return undefined;
  });

  readonly controlNameKey = computed(() => {
    const fc = this.form_control();
    if (typeof fc === 'string' && fc) {
      return fc as Extract<keyof T, string>;
    }
    const name = this.control_name();
    if (name) {
      return name as Extract<keyof T, string>;
    }
    return undefined;
  });

  protected readonly resolvedFormField = resolveFormField(this.form, this.controlNameKey as any) as any;
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
          this.syncFilesFromValue(val);
          this.on_change.emit(val);
        });
      }
    });

    effect((onCleanup) => {
      const ctrl = this.legacyControl();
      if (ctrl) {
        const val = ctrl.value;
        untracked(() => {
          this.syncFilesFromValue(val);
          this.on_change.emit(val);
        });

        const sub = ctrl.valueChanges.subscribe(v => {
          this.syncFilesFromValue(v);
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

  private syncFilesFromValue(val: any): void {
    if (Array.isArray(val)) {
      this.selected_files.set(val);
      // Generate previews
      const urls: string[] = [];
      val.forEach((file: any) => {
        if (file instanceof File && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const all = [...this.preview_urls()];
            const idx = this.selected_files().indexOf(file);
            if (idx > -1) {
              all[idx] = e.target?.result as string;
              this.preview_urls.set(all);
            }
          };
          reader.readAsDataURL(file);
          urls.push('');
        } else {
          urls.push('');
        }
      });
      this.preview_urls.set(urls);
    } else {
      this.selected_files.set([]);
      this.preview_urls.set([]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.drag_over.set(true);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.drag_over.set(false);
    const files = Array.from(event.dataTransfer?.files ?? []);
    this.processFiles(files);
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.processFiles(files);
    input.value = '';
  }

  private processFiles(files: File[]): void {
    this.has_error.set(false);
    this.error_message.set('');
    const max_bytes = this.max_size_mb() * 1024 * 1024;
    const accepted = this.accept();

    const valid: File[] = [];
    for (const file of files) {
      if (file.size > max_bytes) {
        this.has_error.set(true);
        this.error_message.set(`"${file.name}" exceeds the ${this.max_size_mb()}MB limit.`);
        return;
      }
      if (accepted !== '*' && !this.matchesAccept(file, accepted)) {
        this.has_error.set(true);
        this.error_message.set(`"${file.name}" is not an accepted file type.`);
        return;
      }
      valid.push(file);
    }

    const updated = this.multiple()
      ? [...this.selected_files(), ...valid]
      : valid.slice(0, 1);

    this.selected_files.set(updated);

    const urls = [...this.preview_urls()];
    valid.forEach((file, idx) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const all = [...this.preview_urls()];
          all[this.selected_files().length - valid.length + idx] = e.target?.result as string;
          this.preview_urls.set(all);
        };
        reader.readAsDataURL(file);
      } else {
        urls.push('');
      }
    });
    if (!valid.some((f) => f.type.startsWith('image/'))) {
      this.preview_urls.set(urls);
    }

    const f = this.field();
    if (f) {
      f.value.set(updated as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(updated);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    this.on_change.emit(updated);
  }

  private matchesAccept(file: File, accept: string): boolean {
    return accept
      .split(',')
      .map((a) => a.trim())
      .some((a) => {
        if (a.startsWith('.')) return file.name.endsWith(a);
        if (a.endsWith('/*')) return file.type.startsWith(a.replace('/*', '/'));
        return file.type === a;
      });
  }

  removeFile(index: number): void {
    const files = [...this.selected_files()];
    const urls = [...this.preview_urls()];
    files.splice(index, 1);
    urls.splice(index, 1);
    this.selected_files.set(files);
    this.preview_urls.set(urls);
    
    const f = this.field();
    if (f) {
      f.value.set(files as any);
      f.markAsDirty();
      f.markAsTouched();
    } else {
      const ctrl = this.legacyControl();
      if (ctrl) {
        ctrl.setValue(files);
        ctrl.markAsDirty();
        ctrl.markAsTouched();
      }
    }
    this.on_change.emit(files);
  }

  removeFileByName(name: string): void {
    const index = this.selected_files().findIndex((f) => f.name === name);
    if (index > -1) this.removeFile(index);
  }
}
