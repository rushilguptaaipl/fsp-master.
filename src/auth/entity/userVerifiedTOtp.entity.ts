import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsersVerifiedOtp {
  @PrimaryGeneratedColumn()
  OtpID: number;

  @Column()
  userName: string;

  @Column()
  otp: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
