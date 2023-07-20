import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from '../dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgetPasswordDto } from '../dto/forgetPasswordDto';
import { UsersVerifiedOtp } from '../entity/userVerifiedTOtp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeForgetPasswordDto } from '../dto/changeForgetPasswordDto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UsersVerifiedOtp)
    private userVerifiedOtp: Repository<UsersVerifiedOtp>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // sign in

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

  // sign up

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const user = await this.usersService.findOne(signUpDto.username);
    if (user) {
      throw new ConflictException('user already exist');
    }
    
    return await this.usersService.createUser(signUpDto);
  }

  // forget password (generates otp)

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

  // change the forget password

  async changeForgetPassword(changeForgetPasswordDto: ChangeForgetPasswordDto) {
    const user = await this.userVerifiedOtp.findOne({
      where: { userName: changeForgetPasswordDto.username },
    });
    const currHour = new Date();
    if (!user) {
      throw new NotFoundException('user doest not exist');
    }
    if (user.otp != changeForgetPasswordDto.otp) {
      throw new NotFoundException('error in otp');
    }
    if (user.isUsed != 2) {
      throw new NotFoundException('otp incorrect already used');
    }
    if (
      user.createdAt.getHours() != currHour.getHours() ||
      currHour.getMinutes() - user.createdAt.getMinutes() > 5
    ) {
      throw new UnauthorizedException('otp expire');
    }

    const { otp, username, confirm_password, ...passToUpdate } =
      changeForgetPasswordDto;
    this.usersRepository.update({ username: user.userName }, passToUpdate);
    return this.userVerifiedOtp.update(user.OtpID, { isUsed: 1 });
  }
}
