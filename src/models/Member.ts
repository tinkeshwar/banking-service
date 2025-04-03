
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Unique,
  AllowNull,
  DataType,
  Index,
  HasMany
} from 'sequelize-typescript';
import { User } from '~/models/User';
import { MemberAddress } from '~/models/MemberAddress';

@Table({
  tableName: 'members',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class Member extends Model {

  @HasMany(() => MemberAddress)
  addresses!: MemberAddress[];

  @BelongsTo(() => User)
  user!: User;

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId!: number;

  @Column
  firstName!: string;

  @AllowNull(true)
  @Column
  middleName?: string;

  @Column
  lastName!: string;

  @Column
  guardian!: string;

  @Column(DataType.ENUM('Father', 'Mother', 'Spouse'))
  relationWithGuardian!: 'Father' | 'Mother' | 'Spouse';

  @Column(DataType.DATE)
  dateOfBirth!: Date;

  @Column
  gender!: string;

  @Column
  maritalStatus!: string;

  @Unique
  @Column
  email!: string;

  @Unique
  @Column
  mobile!: string;

  @Unique
  @AllowNull(true)
  @Column
  alternateNumber?: string;

  @Column
  department!: string;

  @Column
  staffType!: string;

  @Column(DataType.DECIMAL(10, 2))
  income!: number;

  @Column(DataType.ENUM('Active', 'Retired', 'Resigned', 'Terminated'))
  employmentStatus!: 'Active' | 'Retired' | 'Resigned' | 'Terminated';

  @Index('members_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
