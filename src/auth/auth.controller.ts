import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { OAuthUserData } from 'src/decorator/OAuthUserData.decorator';
import { GoogleOAuthUserDto } from './dto/auth-user.dto';

@Controller('/auth')
export class AuthController {
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleOAuth() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@OAuthUserData() user: GoogleOAuthUserDto, @Res() res: Response) {
    res.send({ data: user });
  }
}
