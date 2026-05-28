import moment from 'moment';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export type DateValueFormat = 'iso' | 'timestamp' | 'custom';

export interface DomDateBoundValidator extends ValidatorFn {
  domDateMin?: string;
  domDateMax?: string;
}

export interface DomDateValidatorOptions {
  format?: DateValueFormat;
  customFormat?: string;
  isDateTime?: boolean;
}

export function domDateMin(
  min: string,
  options?: DomDateValidatorOptions,
): DomDateBoundValidator {
  const validator: DomDateBoundValidator = (control: AbstractControl) => {
    if (control.value == null || control.value === '') {
      return null;
    }

    const fmt = options?.format ?? 'iso';
    const actual = parseToDate(control.value, fmt, options?.customFormat, options?.isDateTime ?? false);
    const minDate = parseToDate(min, fmt, options?.customFormat, options?.isDateTime ?? false);

    if (!actual || !minDate || actual >= minDate) {
      return null;
    }

    return { domDateMin: { min, actual: control.value } };
  };

  validator.domDateMin = min;
  return validator;
}

export function domDateMax(
  max: string,
  options?: DomDateValidatorOptions,
): DomDateBoundValidator {
  const validator: DomDateBoundValidator = (control: AbstractControl) => {
    if (control.value == null || control.value === '') {
      return null;
    }

    const fmt = options?.format ?? 'iso';
    const actual = parseToDate(control.value, fmt, options?.customFormat, options?.isDateTime ?? false);
    const maxDate = parseToDate(max, fmt, options?.customFormat, options?.isDateTime ?? false);

    if (!actual || !maxDate || actual <= maxDate) {
      return null;
    }

    return { domDateMax: { max, actual: control.value } };
  };

  validator.domDateMax = max;
  return validator;
}

function getControlValidatorFns(control: AbstractControl): ValidatorFn[] {
  const raw = (control as FormControl & { _rawValidators?: ValidatorFn | ValidatorFn[] | null })
    ._rawValidators;
  if (!raw) {
    return [];
  }
  return Array.isArray(raw) ? raw : [raw];
}

export function getDateBoundsFromControl(
  control: AbstractControl,
  format: DateValueFormat,
  customFormat?: string,
  isDateTime = false,
): { min: Date | null; max: Date | null } {
  let minStr: string | undefined;
  let maxStr: string | undefined;

  for (const validator of getControlValidatorFns(control)) {
    const bound = validator as DomDateBoundValidator;
    if (bound.domDateMin) {
      minStr = bound.domDateMin;
    }
    if (bound.domDateMax) {
      maxStr = bound.domDateMax;
    }
  }

  return {
    min: minStr ? parseToDate(minStr, format, customFormat, isDateTime) : null,
    max: maxStr ? parseToDate(maxStr, format, customFormat, isDateTime) : null,
  };
}

const ISO_DATE_FORMAT = 'YYYY-MM-DD';
const ISO_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';

export function defaultCustomDateFormat(isDateTime: boolean): string {
  return isDateTime ? ISO_DATETIME_FORMAT : ISO_DATE_FORMAT;
}

export function formatForValue(
  date: Date,
  format: DateValueFormat,
  customFormat?: string,
  isDateTime = false,
): string {
  if (!date || isNaN(date.getTime())) {
    return '';
  }

  switch (format) {
    case 'timestamp':
      return date.getTime().toString();
    case 'custom':
      return moment(date).format(customFormat ?? defaultCustomDateFormat(isDateTime));
    case 'iso':
    default:
      return moment(date).format(isDateTime ? ISO_DATETIME_FORMAT : ISO_DATE_FORMAT);
  }
}

export function parseToDate(
  value: unknown,
  format: DateValueFormat,
  customFormat?: string,
  isDateTime = false,
): Date | null {
  if (value == null || value === '') {
    return null;
  }

  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }

  const str = String(value);

  if (format === 'timestamp') {
    const ts = Number(str);
    if (isNaN(ts)) {
      return null;
    }
    const date = new Date(ts);
    return isNaN(date.getTime()) ? null : date;
  }

  const parsePattern =
    format === 'custom'
      ? (customFormat ?? defaultCustomDateFormat(isDateTime))
      : isDateTime
        ? ISO_DATETIME_FORMAT
        : ISO_DATE_FORMAT;

  const parsed = moment(str, parsePattern, true);
  return parsed.isValid() ? parsed.toDate() : null;
}
