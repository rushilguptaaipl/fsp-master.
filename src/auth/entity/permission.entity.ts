import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  guard_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;


  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToMany(() => User , (user)=>user.permission)
  user: User[];

  @ManyToMany(() => Roles , (roles)=>roles.permissions)
  roles: Roles[]
}
