import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { currentUser } from 'src/user-address/custom-decorators/currentUser.decorator';
import { ChangePasswordDto } from './dto/changePasswordDto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('update-profile')
  updateProfile(
    @Body() UpdateUserDto: UpdateUserDto,
    @currentUser() id: number,
  ) {
    return this.usersService.updateProfile(id, UpdateUserDto);
  }

  @Post('changepassword')
  changePassword(@Body() changePasswordDto:ChangePasswordDto , @currentUser() id: number){
    return this.usersService.changePassword(id,changePasswordDto)
  }
}
