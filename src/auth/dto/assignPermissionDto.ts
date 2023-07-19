import { IsArray, IsNotEmpty, IsNumber} from 'class-validator';

export class AssignPermissionDto {
  @IsArray()
  @IsNotEmpty()
  permission_id: number[];

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
