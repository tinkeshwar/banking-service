import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  BeforeCreate,
  BeforeUpdate,
  HasMany,
  AllowNull,
  Index,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import { UserProfile } from '~/models/UserProfile';

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
  paranoid: true
})
export class User extends Model {
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User): Promise<void> {
    if (instance.password) {
      instance.password = await bcrypt.hash(instance.password, 10);
    }
  }

  @HasMany(() => UserProfile)
  profiles!: UserProfile[];

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @AllowNull(false)
  @Column
  username!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @Column
  lastLogin!: Date;

  @Index('users_created_at_idx')
  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;

  @Column
  deletedAt?: Date;
}
