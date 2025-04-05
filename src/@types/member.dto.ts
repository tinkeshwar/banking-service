export enum RelationType { FATHER = 'Father', MOTHER = 'Mother', SPOUSE = 'Spouse' }
export enum EmploymentStatus { ACTIVE = 'Active', RETIRED = 'Retired', RESIGNED = 'Resigned', TERMINATED = 'Terminated' }
export enum AddressType { LOCAL = 'Local', CURRENT = 'Current', PERMANENT = 'Permanent' }
export enum Gender { MALE = 'Male', FEMALE = 'Female', OTHER = 'Other' }
export enum MaritalStatus { SINGLE = 'Single', MARRIED = 'Married', DIVORCED = 'Divorced', WIDOWED = 'Widowed' }
export enum StaffType { SUPERIOR = 'Superior', CLERK = 'Clerk', CONTRACT = 'Contract' }
export interface BaseMemberAddressInterface {
  memberId?: number;
  addressType: AddressType;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface BaseMemberInterface {
  firstName: string;
  middleName?: string;
  lastName: string;
  guardian: string;
  relationWithGuardian: RelationType;
  dateOfBirth: Date;
  gender: Gender;
  maritalStatus: MaritalStatus;
  email: string;
  mobile: string;
  alternateNumber?: string;
  department: string;
  staffType: StaffType;
  income: number;
  employmentStatus: EmploymentStatus;
}

export interface MemberCreateRequestInterface extends BaseMemberInterface {
  addresses: BaseMemberAddressInterface[];
}

export interface MemberResponseInterface extends BaseMemberInterface {
  addresses: BaseMemberAddressInterface[];
}