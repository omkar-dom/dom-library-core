export interface EmployeeAddress {
  city: string;
  state: string;
  pincode: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface Employee {
  fullName: string;
  email: string;
  phone: string;
  age: number | null;
  dateOfBirth: Date | null;
  aadhaarNumber: string;
  department: string;
  skills: string[];
  joiningDate: Date | null;
  employmentType: string;
  contractEndDate: Date | null;
  isActive: boolean;
  address: EmployeeAddress;
  emergencyContacts: EmergencyContact[];
}

export const DEPARTMENT_OPTIONS = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'hr', label: 'HR' },
  { value: 'finance', label: 'Finance' },
  { value: 'sales', label: 'Sales' },
  { value: 'operations', label: 'Operations' },
] as const;

export const SKILL_OPTIONS = [
  { value: 'angular', label: 'Angular' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'devops', label: 'DevOps' },
  { value: 'uiux', label: 'UI/UX' },
] as const;

export const EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
] as const;

export function createEmptyAddress(): EmployeeAddress {
  return {
    city: '',
    state: '',
    pincode: '',
  };
}

export function createEmptyEmergencyContact(): EmergencyContact {
  return {
    name: '',
    phone: '',
  };
}

export function createEmptyEmployee(): Employee {
  return {
    fullName: '',
    email: '',
    phone: '',
    age: null,
    dateOfBirth: null,
    aadhaarNumber: '',
    department: '',
    skills: [],
    joiningDate: null,
    employmentType: '',
    contractEndDate: null,
    isActive: false,
    address: createEmptyAddress(),
    emergencyContacts: [createEmptyEmergencyContact()],
  };
}
