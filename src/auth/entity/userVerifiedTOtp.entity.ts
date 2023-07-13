import { isDefaultEnum } from 'src/user-address/enum/isDefaultEnum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum isUsedEnum{
  used = 1,
  NotUsed = 2,
}


@Entity()
export class UsersVerifiedOtp {
  @PrimaryGeneratedColumn()
  OtpID: number;

  @Column()
  userName: string;

  @Column()
  otp: number;


  @Column({
    type: 'enum',
    enum: isUsedEnum,
    default: isUsedEnum.NotUsed,
    comment: '1 => used , 2 => notUsed',
  })
  isUsed: isUsedEnum;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
