import { IS_ALPHANUMERIC, IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {

  

  @IsNotEmpty()
  old_password: string;

  
  @IsNotEmpty()
  password: string;

  
  @IsNotEmpty()
  confirm_password: string;
}
