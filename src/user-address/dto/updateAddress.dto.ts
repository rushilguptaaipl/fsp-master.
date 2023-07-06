import { IsNotEmpty, IsString } from 'class-validator';

export class updateAddressDto {
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  street: string;

}
