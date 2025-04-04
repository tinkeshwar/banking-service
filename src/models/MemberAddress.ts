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
import { Member } from '~/models/Member';

enum AddressType {
  LOCAL = 'local',
  CURRENT = 'current',
  PERMANENT = 'permanent'
}

@Table({
  tableName: 'member_addresses',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class MemberAddress extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Member)
  @Column
  memberId!: number;

  @BelongsTo(() => Member)
  member!: Member;

  @Column(DataType.ENUM(...Object.values(AddressType)))
  addressType!: AddressType;

  @Column
  line1!: string;

  @Column
  line2?: string;

  @Column
  city!: string;

  @Column
  state!: string;

  @Column
  country!: string;

  @Column
  postalCode!: string;

  @Index('member_addresses_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
