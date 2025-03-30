
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
  Index
} from 'sequelize-typescript';
import { User } from '~/models/User';

@Table({
  tableName: 'members',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class Member extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

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

  @Column(DataType.ENUM('active', 'retired', 'resigned', 'terminated'))
  employmentStatus!: 'active' | 'retired' | 'resigned' | 'terminated';

  @Index('members_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @AllowNull(false)
  @Column
  deletedAt?: Date;
}
