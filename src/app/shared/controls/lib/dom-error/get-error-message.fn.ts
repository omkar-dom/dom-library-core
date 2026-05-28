import { FormControl } from '@angular/forms';

export function getErrorMessage(control: FormControl): string {
  if (!control?.errors) return '';
  const errors = control.errors;

  if (errors['required'])     return 'This field is required';
  if (errors['requiredTrue']) return 'You must accept this to continue';
  if (errors['email'])        return 'Enter a valid email address';
  if (errors['min'])          return `Minimum value is ${errors['min'].min}`;
  if (errors['max'])          return `Maximum value is ${errors['max'].max}`;
  if (errors['domDateMin'])    return `Date must be on or after ${errors['domDateMin'].min}`;
  if (errors['domDateMax'])    return `Date must be on or before ${errors['domDateMax'].max}`;
  if (errors['minlength'])    return `Minimum ${errors['minlength'].requiredLength} characters`;
  if (errors['maxlength'])    return `Maximum ${errors['maxlength'].requiredLength} characters`;
  if (errors['pattern'])      return 'Invalid format';

  const first_key = Object.keys(errors)[0];
  return errors[first_key]?.message ?? 'Invalid value';
}
