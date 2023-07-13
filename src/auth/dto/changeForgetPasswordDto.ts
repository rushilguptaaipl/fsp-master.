import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeForgetPasswordDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  otp: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
