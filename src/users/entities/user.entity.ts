import { Permission } from 'src/auth/entity/permission.entity';
import { Roles } from 'src/auth/entity/roles.entity';
import { User_address } from 'src/user-address/entities/user-address.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => User_address , address => address.user )
  addresses: User_address[]

  @Column()
  firstName:string;

  @Column()
  lastName:string;

  @Column({type:"bigint"})
  phoneNo : number

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToMany(() => Permission , (Permission)=>Permission.user, { cascade: true })
  @JoinTable({ name: 'user_has_permission' })
  permission: Permission[];


  @ManyToMany(() => Roles , (roles) => roles.user, { cascade: true })
  @JoinTable({ name: 'user_has_roles' })
  role: Roles[];
}