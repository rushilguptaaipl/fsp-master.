import { IsNotEmpty } from 'class-validator';

export class updateDefaultDto {
  @IsNotEmpty()
  addressId: number;
}
