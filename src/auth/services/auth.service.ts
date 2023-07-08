import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from '../dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgetPasswordDto } from '../dto/forgetPasswordDto';
import { UsersVerifiedOtp } from '../entity/userVerifiedTOtp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UsersVerifiedOtp)
    private userVerifiedOtp: Repository<UsersVerifiedOtp>,
  ) {}
  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOne(signInDto.username);
    if (user?.password !== signInDto.password) {
      throw new NotFoundException('user doest not exist');
    }

    const payload = {
      sub: user.id,
      id: user.id,
      username: user.username,
    };
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

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<any> {
    const user = await this.usersService.findOne(forgetPasswordDto.username);
    if (!user) {
      throw new NotFoundException('user doest not exist');
    }
    const otp: Partial<UsersVerifiedOtp> = {
      otp: await Math.floor(1000 + Math.random() * 1000),
      userName: user.username,
    };

    return this.userVerifiedOtp.save(otp);
  }

  async changeForgetPassword(changeForgetPasswordDto: ChangeForgetPasswordDto) {
    const user = await this.userVerifiedOtp.findOne(
      changeForgetPasswordDto.username,
    );
    if (!user) {
      throw new NotFoundException('user doest not exist');
    }
    if (user.otp == changeForgetPasswordDto.otp) {
      
    }
  }
}
