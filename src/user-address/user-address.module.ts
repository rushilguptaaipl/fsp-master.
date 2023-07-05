import { Module } from '@nestjs/common';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_address } from './entities/user-address.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User_address , User])],
  controllers: [UserAddressController],
  providers: [UserAddressService]
})
export class UserAddressModule {}
