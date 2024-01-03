import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { OAuthUserData } from 'src/decorator/OAuthUserData.decorator';
import { GoogleOAuthUserDto } from 'src/type/userDto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleOAuth() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@OAuthUserData() user: GoogleOAuthUserDto, @Res() res: Response) {
    const data = await this.authService.googleLogin(user);
    res.send({ data });
  }
}
