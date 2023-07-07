import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Permission {
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
  }
  