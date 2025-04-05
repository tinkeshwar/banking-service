import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { ProfileStatus, UserType } from '~/@types/user.dto';
import { User } from '~/models/User';
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
  @Column(DataType.ENUM(...Object.values(UserType)))
  userType!: UserType;

  @Column
  firstName!: string;

  @Column
  middleName?: string;

  @Column
  lastName!: string;

  @Index('user_profiles_email_index')
  @Column
  email?: string;

  @Index('user_profiles_mobile_index')
  @Column
  mobile!: string;

  @Index('user_profiles_profile_status_index')
  @Column(DataType.ENUM(...Object.values(ProfileStatus)))
  profileStatus!: ProfileStatus;

  @Index('user_profiles_created_at_index')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
