import {IsNotEmpty, IsNumber} from 'class-validator';

export class DeleteAssignedRoleDto {
  @IsNumber()
  @IsNotEmpty()
  role_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
