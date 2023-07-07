import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from '../dto/signup.dto'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOne(signInDto.username);
    if (user?.password !== signInDto.password) {
      throw new NotFoundException('user doest not exist');
    }

    const payload = { sub: user.id,id: user.id ,username: user.username, roles: ['admin'] };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const user = await this.usersService.findOne(signUpDto.username);
    if (user) {
      throw new ConflictException('user already exist');
    }

    return await this.usersService.createUser(signUpDto);
  }
}
