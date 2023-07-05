import { Injectable } from '@nestjs/common';
import { User_address } from './entities/user-address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { addAddressDto } from './dto/addAddress.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(User_address)
    private addressRepository: Repository<User_address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addAddress(addAddressDto) {
    console.log(addAddressDto);
    return await this.addressRepository.save(addAddressDto);
  }

  async readAddress() {
    return await this.addressRepository.find();
  }

  async deleteAddress(id: number) {
    return this.addressRepository.delete(id);
  }

  async updateAddress(id: any, updateAddressDto) {
    const user = await this.addressRepository.findOne(id);
    user.street = updateAddressDto;
    user.city = updateAddressDto;
    return await this.addressRepository.save(user);
  }
}
