import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;
   
}
