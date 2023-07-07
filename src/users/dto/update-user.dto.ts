import { IsNumber, IsString } from "class-validator";

export class UpdateUserDto  {

    @IsString()
    firstName:string;
  
    @IsString()
    lastName:string;
  
    @IsNumber()
    phoneNo : number
  
}
