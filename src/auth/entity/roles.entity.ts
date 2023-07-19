import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn({type:'bigint'})
  id: number;

  @Column({type:'varchar'})
  name: string;

  @Column({type:'varchar'})
  guard_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToMany(() => Permission , {cascade : true})
  @JoinTable({name:"role_has_permission"})
  permissions: Permission[]

  @ManyToMany(() => User , (user)=>user.role)
  user: User[];
}
