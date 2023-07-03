import { ConflictException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOne(signInDto.username);
    if (user?.password !== signInDto.password) {
      throw new ConflictException();
    }
    const { password, ...result } = user;
    return result;
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const user = await this.usersService.findOne(signUpDto.username);
    if (user) {
      throw new ConflictException();
    }
   
    return await this.usersService.createUser(signUpDto);
  }
}
