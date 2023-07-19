import { IsArray, IsNotEmpty, IsNumber} from 'class-validator';

export class AssignPermissionToRoleDto {
  @IsArray()
  @IsNotEmpty()
  permission_id: number[];

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
