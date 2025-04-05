
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Unique,
  DataType,
  Index,
  HasMany
} from 'sequelize-typescript';
import { User } from '~/models/User';
import { MemberAddress } from '~/models/MemberAddress';
import { EmploymentStatus, RelationType } from '~/@types/member.dto';

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
  @Column
  userId!: number;

  @Column
  firstName!: string;

  @Column
  middleName?: string;

  @Column
  lastName!: string;

  @Column
  guardian!: string;

  @Column(DataType.ENUM(...Object.values(RelationType)))
  relationWithGuardian!: RelationType;

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
  @Column
  alternateNumber?: string;

  @Column
  department!: string;

  @Column
  staffType!: string;

  @Column(DataType.DECIMAL(10, 2))
  income!: number;

  @Column(DataType.ENUM(...Object.values(EmploymentStatus)))
  employmentStatus!: EmploymentStatus;

  @Index('members_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
