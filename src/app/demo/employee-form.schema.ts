import {
  apply,
  applyEach,
  email,
  hidden,
  max,
  maxDate,
  maxLength,
  min,
  minDate,
  minLength,
  pattern,
  required,
  SchemaFn,
  SchemaPathTree,
  validate,
} from '@angular/forms/signals';

import { EmergencyContact, Employee, EmployeeAddress } from './employee.model';
import { calculateAge, isValidAadhaar, startOfDay } from './employee.validators';

function addressSchema(path: SchemaPathTree<EmployeeAddress>): void {
  required(path.city, { message: 'City is required' });
  minLength(path.city, 2, { message: 'City must be at least 2 characters' });
  required(path.state, { message: 'State is required' });
  required(path.pincode, { message: 'PIN code is required' });
  pattern(path.pincode, /^\d{6}$/, { message: 'PIN code must be 6 digits' });
}

function emergencyContactSchema(path: SchemaPathTree<EmergencyContact>): void {
  required(path.name, { message: 'Contact name is required' });
  minLength(path.name, 2, { message: 'Contact name must be at least 2 characters' });
  required(path.phone, { message: 'Contact phone is required' });
  pattern(path.phone, /^(?:\+?91)?\+?[6-9]\d{9}$/, {
    message: 'Enter a valid Indian mobile number',
  });
}

function eighteenYearsAgo(): Date {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return startOfDay(date);
}

function sixtyFiveYearsAgo(): Date {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 65);
  return startOfDay(date);
}

function fiveYearsAfterJoining(joiningDate: Date | null | undefined): Date | undefined {
  if (!joiningDate) {
    return undefined;
  }
  const max = new Date(joiningDate);
  max.setFullYear(max.getFullYear() + 5);
  return startOfDay(max);
}

export const applyEmployeeValidators: SchemaFn<Employee> = (schema) => {
  required(schema.fullName, { message: 'Full name is required' });
  minLength(schema.fullName, 2, { message: 'Full name must be at least 2 characters' });
  maxLength(schema.fullName, 100, { message: 'Full name cannot exceed 100 characters' });

  required(schema.email, { message: 'Email is required' });
  email(schema.email, { message: 'Enter a valid email address' });

  required(schema.phone, { message: 'Phone number is required' });
  pattern(schema.phone, /^(?:\+?91)?\+?[6-9]\d{9}$/, {
    message: 'Enter a valid Indian mobile number',
  });

  required(schema.age, { message: 'Age is required' });
  min(schema.age, 18, { message: 'Employee must be at least 18 years old' });
  max(schema.age, 65, { message: 'Employee age cannot exceed 65 years' });
  validate(schema.age, (ctx) => {
    const age = ctx.value();
    const dateOfBirth = ctx.valueOf(schema.dateOfBirth);
    if (age == null || !dateOfBirth) {
      return undefined;
    }
    const calculatedAge = calculateAge(dateOfBirth);
    if (Math.abs(calculatedAge - age) > 1) {
      return { kind: 'ageMismatch', message: 'Age does not match date of birth' };
    }
    return undefined;
  });

  required(schema.dateOfBirth, { message: 'Date of birth is required' });
  maxDate(schema.dateOfBirth, () => startOfDay(new Date()), {
    message: 'Date of birth cannot be in the future',
  });
  maxDate(schema.dateOfBirth, () => eighteenYearsAgo(), {
    message: 'Employee must be at least 18 years old',
  });
  minDate(schema.dateOfBirth, () => sixtyFiveYearsAgo(), {
    message: 'Employee age cannot exceed 65 years',
  });

  required(schema.aadhaarNumber, { message: 'Aadhaar number is required' });
  pattern(schema.aadhaarNumber, /^\d{12}$/, {
    message: 'Aadhaar number must be exactly 12 digits',
  });
  validate(schema.aadhaarNumber, (ctx) => {
    const aadhaar = ctx.value();
    if (!aadhaar || !/^\d{12}$/.test(aadhaar)) {
      return undefined;
    }
    if (!isValidAadhaar(aadhaar)) {
      return { kind: 'aadhaarChecksum', message: 'Invalid Aadhaar number checksum' };
    }
    return undefined;
  });

  apply(schema.address, addressSchema);

  minLength(schema.emergencyContacts, 1, {
    message: 'Add at least one emergency contact',
  });
  applyEach(schema.emergencyContacts, emergencyContactSchema);

  required(schema.department, { message: 'Department is required' });
  required(schema.skills, { message: 'Select at least one skill' });

  required(schema.joiningDate, { message: 'Joining date is required' });
  maxDate(schema.joiningDate, () => startOfDay(new Date()), {
    message: 'Joining date cannot be in the future',
  });
  minDate(
    schema.joiningDate,
    ({ valueOf }) => {
      const dateOfBirth = valueOf(schema.dateOfBirth);
      return dateOfBirth ? startOfDay(dateOfBirth) : undefined;
    },
    { message: 'Joining date cannot be before date of birth' },
  );

  required(schema.employmentType, { message: 'Employment type is required' });

  hidden(schema.contractEndDate, {
    when: ({ valueOf }) => valueOf(schema.employmentType) !== 'contract',
  });
  required(schema.contractEndDate, {
    message: 'Contract end date is required for contract employees',
    when: ({ valueOf }) => valueOf(schema.employmentType) === 'contract',
  });
  minDate(
    schema.contractEndDate,
    ({ valueOf }) => {
      const joiningDate = valueOf(schema.joiningDate);
      return joiningDate ? startOfDay(joiningDate) : undefined;
    },
    {
      message: 'Contract end date must be on or after joining date',
      when: ({ valueOf }) => valueOf(schema.employmentType) === 'contract',
    },
  );
  maxDate(
    schema.contractEndDate,
    ({ valueOf }) => fiveYearsAfterJoining(valueOf(schema.joiningDate)),
    {
      message: 'Contract cannot exceed 5 years from joining date',
      when: ({ valueOf }) => valueOf(schema.employmentType) === 'contract',
    },
  );
};
