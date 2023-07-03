import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;
}
