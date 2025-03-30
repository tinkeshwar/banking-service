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
import { Member } from '~/models/Member';

type AccountType = 'saving' | 'loan' | 'current' | 'fixed' | 'recurring';
type AccountStatus = 'active' | 'freeze' | 'closed' | 'scrutiny' | 'pending';

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

  @Column(DataType.ENUM('saving', 'loan', 'current', 'fixed', 'recurring'))
  accountType!: AccountType;

  @Default('pending')
  @Column(DataType.ENUM('active', 'freeze', 'closed', 'scrutiny', 'pending'))
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

  @AllowNull(true)
  @Column
  deletedAt?: Date;
}
