import { IsArray, IsNotEmpty, IsNumber} from 'class-validator';

export class RemovePermissionFromRoleDto{
  @IsNumber()
  @IsNotEmpty()
  permission_id: number;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
