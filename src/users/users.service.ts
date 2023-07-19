import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { ChangePasswordDto } from './dto/changePasswordDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  createUser(signUpDto: SignUpDto): Promise<User | null> {
    return this.usersRepository.save(signUpDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['addresses'] });
  }

  // Update(id: number, UpdateUserDto) {
  //   return this.usersRepository.update(id, UpdateUserDto);
  // }

  updateProfile(id: number, UpdateUserDto) {
    return this.usersRepository.update(id, UpdateUserDto);
  }

  changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    if (this.usersRepository.find({ where: { id: id } })) {
      if (changePasswordDto.password != changePasswordDto.confirm_password) {
        throw new UnauthorizedException("new oassword and confirm password did not match");
      }
      const {old_password , confirm_password , ...password} = changePasswordDto
      return this.usersRepository.update(id, password);
    }
    else
    {
      throw new UnauthorizedException("user not found")
    }
  }

  findById(userId :number) {
    return this.usersRepository.findOne({where:{id: userId},relations : {role :true}})
  }
}
