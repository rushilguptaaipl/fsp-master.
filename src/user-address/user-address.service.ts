import { Injectable } from '@nestjs/common';
import { User_address } from './entities/user-address.entity';
import { Any, DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { isDefaultEnum } from './enum/isDefaultEnum';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(User_address)
    private addressRepository: Repository<User_address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addAddress(addAddressDto) {
    // const  test:any= ()=>{this.addressRepository.find({
    //   where: [{ user: addAddressDto.userid }, { isDefault: isDefaultEnum.NotDefault },
    //   ],
    // })}
    // if(this.addressRepository.find(test)){
    //   addAddressDto.isDefault = 2;
    // }
    return await this.addressRepository.save(addAddressDto);
  }

  async readAllAddress() {
    return await this.addressRepository.find();
  }

  async deleteAddress(id: number) {
    return this.addressRepository.delete(id);
  }

  async updateAddress(id: number, updateAddressDto) {
    return await this.addressRepository.update(id, updateAddressDto);
  }

  async updateDefaultAddress(userid, id) {
    const test: any = () => {
      this.addressRepository.find({
        where: { user:userid, isDefault: isDefaultEnum.Default },
        relations: { user: true },
      });
    };

    // const data = {
    //   notDefault: isDefaultEnum.NotDefault,
    //   id : userid
    // }
    // const test2: any = () => {
    //    this.addressRepository
    //     .createQueryBuilder()
    //     .where('user: :id', { id })
    //     .andWhere('isDefault: :notDefault', { isDefault:isDefaultEnum.NotDefault });
    // };
    // await this.addressRepository.update(test1, {
    //   isDefault: isDefaultEnum.NotDefault,
    // });

    await this.addressRepository.update(test, {
      isDefault: isDefaultEnum.NotDefault,
    });

    return await this.addressRepository.update(id, {
      isDefault: isDefaultEnum.Default,
    });
  }
}
