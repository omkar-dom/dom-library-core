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
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomErrorComponent } from '../dom-error/dom-error.component';

@Component({
  selector: 'dom-files',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DomErrorComponent],
  templateUrl: './dom-files.component.html',
})
export class DomFilesComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  readonly form_group    = input<FormGroup>();
  readonly form_control  = input<FormControl>();
  readonly control_name  = input<string>();
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

  readonly control = computed<FormControl>(
    () =>
      this.form_control() ??
      (this.form_group()?.get(this.control_name()!) as FormControl),
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

    this.control().setValue(updated);
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
    this.control().setValue(files);
    this.on_change.emit(files);
  }

  removeFileByName(name: string): void {
    const index = this.selected_files().findIndex((f) => f.name === name);
    if (index > -1) this.removeFile(index);
  }
}
