import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey, AllowNull, BelongsTo, Index } from 'sequelize-typescript';
import { User } from '~/models/User';

enum UserType {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  CONSUMER = 'consumer'
}

enum ProfileStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

@Table({
  tableName: 'user_profiles',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class UserProfile extends Model {

  @BelongsTo(() => User)
  user!: User;

  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Index('user_profiles_user_id_index')
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @Index('user_profiles_user_type_index')
  @Column({
    type: DataType.ENUM(...Object.values(UserType)),
    allowNull: false,
    defaultValue: UserType.EMPLOYEE
  })
  userType!: UserType;

  @AllowNull(false)
  @Column
  firstName!: string;

  @AllowNull(true)
  @Column
  middleName?: string;

  @AllowNull(false)
  @Column
  lastName!: string;

  @Index('user_profiles_email_index')
  @AllowNull(true)
  @Column
  email?: string;

  @Index('user_profiles_mobile_index')
  @AllowNull(false)
  @Column
  mobile!: string;

  @Index('user_profiles_profile_status_index')
  @Column({
    type: DataType.ENUM(...Object.values(ProfileStatus)),
    allowNull: false,
    defaultValue: ProfileStatus.ACTIVE,
  })
  profileStatus!: ProfileStatus;

  @Index('user_profiles_created_at_index')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
