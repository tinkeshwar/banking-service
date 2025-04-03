import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
  Index,
  AllowNull
} from 'sequelize-typescript';
import { Account } from '~/models/Account';
import { Member } from '~/models/Member';

type KycStatus = 'verified' | 'pending' | 'rejected' | 'scrutiny';

@Table({
  tableName: 'account_verifications',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class AccountVerification extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @BelongsTo(() => Account)
  account!: Account;

  @Column
  aadhaarCard!: string;

  @Column
  panCard!: string;

  @ForeignKey(() => Member)
  @Column
  firstGuarantorId!: number;

  @BelongsTo(() => Member, 'firstGuarantorId')
  firstGuarantor!: Member;

  @ForeignKey(() => Member)
  @Column
  secondGuarantorId!: number;

  @BelongsTo(() => Member, 'secondGuarantorId')
  secondGuarantor!: Member;

  @Column(DataType.ENUM('verified', 'pending', 'rejected', 'scrutiny'))
  kycStatus!: KycStatus;

  @Index('account_verifications_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
