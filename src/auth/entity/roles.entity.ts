import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn({type:'bigint'})
  role_id: number;

  @Column({type:'varchar'})
  name: string;

  @Column({type:'varchar'})
  guard_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[]
}
