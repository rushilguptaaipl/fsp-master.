import { Body, Controller, Post, Redirect } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/signin.dto';
import { SignUpDto } from '../dto/signup.dto';
import { ForgetPasswordDto } from '../dto/forgetPasswordDto';

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
  @Post('forget-password')
  // @Redirect()
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authservice.forgetPassword(forgetPasswordDto);
  }
  @Post('change-forget-password')
  changeForgetPassword( @Body() changeForgetPasswordDto: changeForgetPasswordDto) {
    return this.authservice.changeForgetPassword(changeForgetPasswordDto)
    }
}
