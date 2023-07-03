import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/signup.dto';

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
}
