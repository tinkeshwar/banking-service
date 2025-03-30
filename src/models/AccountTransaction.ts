import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AllowNull,
  DataType,
  Default,
  Index
} from 'sequelize-typescript';
import { Account } from '~/models/Account';
import { User } from '~/models/User';

type TransactionType = 'credit' | 'debit';
type TransactionMode = 'cash' | 'transfer' | 'cheque';

@Table({
  tableName: 'account_transactions',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class AccountTransaction extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Account)
  @AllowNull(false)
  @Column
  accountId!: number;

  @BelongsTo(() => Account)
  account!: Account;

  @AllowNull(false)
  @Column(DataType.ENUM('credit', 'debit'))
  transactionType!: TransactionType;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  transactionAmount!: number;

  @AllowNull(false)
  @Column(DataType.ENUM('cash', 'transfer', 'cheque'))
  transactionMode!: TransactionMode;

  @Column(DataType.TEXT)
  transactionReference!: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  balanceBeforeTransaction!: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  balanceAfterTransaction!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  createdBy!: number;

  @BelongsTo(() => User)
  creator!: User;

  @Index('account_transactions_created_at_idx')
  @AllowNull(false)
  @Column
  createdAt!: Date;

  @AllowNull(false)
  @Column
  updatedAt!: Date;

  @AllowNull(true)
  @Column
  deletedAt?: Date;
}
