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
  @AllowNull(false)
  @Column
  memberId!: number;

  @BelongsTo(() => Member)
  member!: Member;

  @AllowNull(false)
  @Column(DataType.ENUM('local', 'current', 'permanent'))
  addressType!: 'local' | 'current' | 'permanent';

  @AllowNull(false)
  @Column
  line1!: string;

  @AllowNull(true)
  @Column
  line2?: string;

  @AllowNull(false)
  @Column
  city!: string;

  @AllowNull(false)
  @Column
  state!: string;

  @AllowNull(false)
  @Column
  country!: string;

  @AllowNull(false)
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
