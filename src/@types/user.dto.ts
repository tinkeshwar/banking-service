export interface UserInterface {
    id?: number;
    username: string;
    password: string;
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserProfileInterface {
    id?: number;
    userType: 'admin' | 'employee' | 'consumer';
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    mobile: string;
    alternateNumber?: string;
    profileStatus: 'active' | 'inactive' | 'pending';
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}