import {IsNotEmpty, IsNumber} from 'class-validator';

export class DeleteAssignedPermissionDto {
  @IsNumber()
  @IsNotEmpty()
  permission_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
