export interface MemberAddressInterface {
  addressType: 'Local' | 'Permanent';
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface MemberInterface {
  firstName: string;
  middleName?: string;
  lastName: string;
  guardian: string;
  relationWithGuardian: 'Father' | 'Mother' | 'Spouse';
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  email: string;
  mobile: string;
  alternateNumber?: string;
  department: string;
  staffType: 'Superior' | 'Clerk' | 'Contract';
  income: number;
  employmentStatus: 'Active' | 'Retired' | 'Resigned' | 'Terminated';
}

export interface MemberCreateRequestInterface extends MemberInterface {
  addresses: MemberAddressInterface[];
}
