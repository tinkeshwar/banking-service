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

@Table({
  tableName: 'account_nominees',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class AccountNominee extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Account)
  @AllowNull(false)
  @Column
  accountId!: number;

  @BelongsTo(() => Account)
  account!: Account;

  @Column
  name!: string;

  @Column
  relation!: string;

  @Column(DataType.DATE)
  dateOfBirth!: Date;

  @Column
  mobile!: string;

  @Column(DataType.DECIMAL(10, 2))
  share?: number;

  @Index('account_nominees_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
