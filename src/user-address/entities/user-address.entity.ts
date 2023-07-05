import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum isDefaultEnum {
  Default = 1,
  NotDefault = 2,
}
enum AllowedValues {
  Active = 1,
  InActive = 2,
}

@Entity('user_address')
export class User_address {
  @PrimaryGeneratedColumn()
  address_id: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column({
    type: 'enum',
    enum: AllowedValues,
    default: AllowedValues.Active,
    comment: '0 => Active , 1 => InActive',
  })
  status: AllowedValues;

  @Column({
    type: 'enum',
    enum: isDefaultEnum,
    default: isDefaultEnum.Default,
    comment: '0 => normal , 1 => default',
  })
  isDefault: isDefaultEnum;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
