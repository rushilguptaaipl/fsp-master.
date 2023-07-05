import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { addAddressDto } from './dto/addAddress.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('user-address')
@UseGuards(AuthGuard)
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Post()
  addAddress(@Body() addAddressDto, @Req() request: Request) {
    let current_user = request['user'];
   
    
    addAddressDto.user = current_user.id;

    return this.userAddressService.addAddress(addAddressDto);
  }

  @Get('list')
  readAddress() {
    return this.userAddressService.readAddress();
  }

  @Get()
  deleteAddress(@Req() request: Request) {
    const current_user = request['user'];
    const current_user_id = current_user.id;
    return this.userAddressService.deleteAddress(+current_user_id);
  }

  @Post('update')
  updateAddress(@Req() request: Request, @Body() updateAddressDto) {
    const current_user = request['user'];
    const current_user_id = current_user.id;
    return this.userAddressService.updateAddress(
      +current_user_id,
      updateAddressDto,
    );
  }
}
