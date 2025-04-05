export enum AccountType { SAVING = 'saving', LOAN = 'loan', CURRENT = 'current', FIXED = 'fixed', RECURRING = 'recurring' }
export enum AccountStatus { ACTIVE = 'active', FREEZE = 'freeze', CLOSED = 'closed', SCRUTINY = 'scrutiny', PENDING = 'pending' }
export enum InterestCalculation { MONTHLY = 'monthly', QUARTERLY = 'quarterly', YEARLY = 'yearly' }
export enum PaymentMode { CASH = 'cash', TRANSFER = 'transfer', CHEQUES = 'cheques' }
export enum TransactionType { CREDIT = 'credit', DEBIT = 'debit' }
export enum TransactionMode { CASH = 'cash', TRANSFER = 'transfer', CHEQUE = 'cheque' }
export enum KycStatus { VERIFIED = 'verified', PENDING = 'pending', REJECTED = 'rejected', SCRUTINY = 'scrutiny' }
export interface BaseAccountInterface {
    memberId?: number;
    accountType: AccountType;
    accountStatus: AccountStatus;
    lastBalance: number;
    currentBalance: number;
}
export interface BaseAccountDetailInterface {
    accountId?: number;
    interestRate?: number|null;
    interestCalculation?: InterestCalculation|null;
    principalAmount?: number|null;
    installments?: number|null;
    installmentAmount?: number|null;
    paymentMode: PaymentMode;
    paymentReceipt?: string|null;
}
export interface BaseAccountVerificationInterface {
    accountId?: number;
    aadhaarCard?: string|null;
    panCard?: string|null;
    firstGuarantorId: number|null;
    secondGuarantorId: number|null;
    kycStatus: KycStatus;
}
export interface BaseAccountNomineeInterface {
    accountId?: number;
    name: string;
    relation: string;
    dateOfBirth: Date;
    mobile: string;
    share?: number;
}
export interface BaseAccountTransactionInterface {
    accountId: number;
    transactionType: TransactionType;
    transactionAmount: number;
    transactionMode: TransactionMode;
    transactionReference?: string|null;
    balanceBeforeTransaction: number;
    balanceAfterTransaction: number;
    createdBy: number;
}
