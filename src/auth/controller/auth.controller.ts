import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/signin.dto';
import { SignUpDto } from '../dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authservice.signIn(signInDto);
  }
  @Post('signup')
  signUp(@Body() signupDto: SignUpDto) {
    return this.authservice.signUp(signupDto);
  }
  
}
