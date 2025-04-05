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
  Default,
  Index
} from 'sequelize-typescript';
import { AccountType, AccountStatus } from '~/@types/account.dto';
import { Member } from '~/models/Member';

@Table({
  tableName: 'accounts',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class Account extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Member)
  @AllowNull(false)
  @Column
  memberId!: number;

  @BelongsTo(() => Member)
  member!: Member;

  @Column(DataType.ENUM(...Object.values(AccountType)))
  accountType!: AccountType;

  @Default('pending')
  @Column(DataType.ENUM(...Object.values(AccountStatus)))
  accountStatus!: AccountStatus;

  @Default(0.00)
  @Column(DataType.DECIMAL(10, 2))
  lastBalance!: number;

  @Default(0.00)
  @Column(DataType.DECIMAL(10, 2))
  currentBalance!: number;

  @Index('accounts_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
