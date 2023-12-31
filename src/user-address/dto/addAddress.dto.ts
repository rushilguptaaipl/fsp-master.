import { IsNotEmpty, IsString } from 'class-validator';

export class addAddressDto {
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  street: string;

  user: any;
}
