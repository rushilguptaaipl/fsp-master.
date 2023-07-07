import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePermissionDto{
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    guard_name: string;
}