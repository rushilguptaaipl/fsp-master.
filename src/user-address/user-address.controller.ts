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
import {  addAddressDto } from './dto/addAddress.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { updateAddressDto } from './dto/updateAddress.dto';
import {currentUser} from "./custom-decorators/currentUser.decorator"
import { updateDefaultDto } from './dto/updateDefault.dto';
@Controller('user-address')
@UseGuards(AuthGuard)
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  // @Post('create')
  // addAddress(@Body() addAddressDto:addAddressDto, @Req() request: Request) {
  //   let current_user = request['user'];
  //   addAddressDto.user = current_user.id;
  //   return this.userAddressService.addAddress(addAddressDto);
  // }

  @Post('create')
  addAddress(@Body() addAddressDto:addAddressDto,@currentUser() user : number) {
    addAddressDto.user = user;
    return this.userAddressService.addAddress(addAddressDto);
  }

  @Get('address-list')
  readAllAddress() {
    return this.userAddressService.readAllAddress();
  }

  @Get('delete/:id')
  deleteAddress(@Param('id') id: number) {
    return this.userAddressService.deleteAddress(id);
  }

  @Post('update/:id')
  updateAddress(@Param('id') id: number, @Body() updateAddressDto:updateAddressDto) {
    return this.userAddressService.updateAddress(id, updateAddressDto);
  }

  @Post(':id')
  updateDefaultAddress(@currentUser() user : number , @Param("id") id:number) {
      
    return this.userAddressService.updateDefaultAddress(user,id);
  }

  
}
