import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRoleDto{
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    guard_name: string;
}