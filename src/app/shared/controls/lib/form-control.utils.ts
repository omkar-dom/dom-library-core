import { InputSignal, linkedSignal, Signal } from '@angular/core';
import { FieldTree, ValidationError } from '@angular/forms/signals';

export type FormModel = object;

export function resolveFormField<T extends FormModel>(
  form: InputSignal<FieldTree<T>>,
  formControl: InputSignal<Extract<keyof T, string>>,
): Signal<FieldTree<T[keyof T]>>;

export function resolveFormField<T extends FormModel>(
  form: InputSignal<FieldTree<T> | undefined>,
  formControl: InputSignal<Extract<keyof T, string>>,
): Signal<FieldTree<T[keyof T]> | undefined>;

export function resolveFormField<T extends FormModel>(
  form: InputSignal<any>,
  formControl: InputSignal<Extract<keyof T, string>>,
): any {
  return linkedSignal({
    source: () => ({ form: form(), control: formControl() }),
    computation: ({ form: fieldTree, control }) => {
      if (!fieldTree) return undefined;
      return (fieldTree as unknown as Record<Extract<keyof T, string>, FieldTree<unknown>>)[
        control
      ] as FieldTree<T[keyof T]>;
    },
  });
}

export function firstErrorMessage(
  errors: readonly ValidationError.WithOptionalFieldTree[] | undefined,
): string {
  const error = errors?.[0];
  if (!error) {
    return 'Invalid value';
  }
  return error.message ?? error.kind;
}

export function shouldShowError(touched: boolean, invalid: boolean): boolean {
  return touched && invalid;
}

export interface SelectOption {
  value: string;
  label: string;
}
