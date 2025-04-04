import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
  Index
} from 'sequelize-typescript';
import { Account } from '~/models/Account';

enum InterestCalculation {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly'
}

enum PaymentMode {
  CASH = 'cash',
  TRANSFER = 'transfer',
  CHEQUES = 'cheques'
}
@Table({
  tableName: 'account_details',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class AccountDetail extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @BelongsTo(() => Account)
  account!: Account;

  @Column(DataType.DECIMAL(10, 2))
  interestRate!: number;

  @Column(DataType.ENUM(...Object.values(InterestCalculation)))
  interestCalculation!: InterestCalculation;

  @Column(DataType.DECIMAL(10, 2))
  principalAmount?: number;

  @Column
  installments?: number;

  @Column(DataType.DECIMAL(10, 2))
  installmentAmount?: number;

  @Column(DataType.ENUM(...Object.values(PaymentMode)))
  paymentMode!: PaymentMode;

  @Column
  paymentReceipt?: string;

  @Index('account_details_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
