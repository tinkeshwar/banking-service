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
import { TransactionMode, TransactionType } from '~/@types/account.dto';
import { Account } from '~/models/Account';
import { User } from '~/models/User';

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

  @Column(DataType.ENUM(...Object.values(TransactionType)))
  transactionType!: TransactionType;

  @Column(DataType.DECIMAL(10, 2))
  transactionAmount!: number;

  @Column(DataType.ENUM(...Object.values(TransactionMode)))
  transactionMode!: TransactionMode;

  @Column(DataType.TEXT)
  transactionReference!: string;

  @Column(DataType.DECIMAL(10, 2))
  balanceBeforeTransaction!: number;

  @Column(DataType.DECIMAL(10, 2))
  balanceAfterTransaction!: number;

  @ForeignKey(() => User)
  @Column
  createdBy!: number;

  @BelongsTo(() => User)
  creator!: User;

  @Index('account_transactions_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
