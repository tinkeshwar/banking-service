import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  AllowNull,
  DataType,
  Index
} from 'sequelize-typescript';
import { Account } from '~/models/Account';

type InterestCalculation = 'monthly' | 'quarterly' | 'yearly';
type PaymentMode = 'cash' | 'transfer' | 'cheques';

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

  @Column(DataType.ENUM('monthly', 'quarterly', 'yearly'))
  interestCalculation!: InterestCalculation;

  @AllowNull(true)
  @Column(DataType.DECIMAL(10, 2))
  principalAmount?: number;

  @AllowNull(true)
  @Column
  installments?: number;

  @AllowNull(true)
  @Column(DataType.DECIMAL(10, 2))
  installmentAmount?: number;

  @Column(DataType.ENUM('cash', 'transfer', 'cheques'))
  paymentMode!: PaymentMode;

  @AllowNull(true)
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
