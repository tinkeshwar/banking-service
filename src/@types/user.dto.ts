export enum UserType { ADMIN = 'admin', EMPLOYEE = 'employee', CONSUMER = 'consumer' }

export enum ProfileStatus { ACTIVE = 'active', INACTIVE = 'inactive', PENDING = 'pending' }

export interface BaseUserInterface {
  username: string;
  password: string;
  lastLogin?: Date;
}

export interface BaseUserProfileInterface {
  userId?: number;
  userType: UserType;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobile: string;
  alternateNumber?: string;
  profileStatus: ProfileStatus;
}

export interface UserInterface extends BaseUserInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  profiles: BaseUserProfileInterface[];
}