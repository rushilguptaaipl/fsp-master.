import { IsArray, IsNotEmpty, IsNumber} from 'class-validator';

export class AssignRoleDto {
  @IsArray()
  @IsNotEmpty()
  role_id: number[];

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
