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
import { KycStatus } from '~/@types/account.dto';
import { Account } from '~/models/Account';
import { Member } from '~/models/Member';
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

  @Column(DataType.ENUM(...Object.values(KycStatus)))
  kycStatus!: KycStatus;

  @Index('account_verifications_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
