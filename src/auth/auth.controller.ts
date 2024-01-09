import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Response } from 'express';

import { AuthUserData } from './decorator/auth-user-data.decorator';
import { OAuthUserDto } from './dto/oauth-user.dto';

@Controller('/auth')
export class AuthController {
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleOAuth() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @AuthUserData() user: OAuthUserDto & { token: string },
    @Res() res: Response,
  ) {
    // TODO: COF-16 머지 후 response 형식 적용
    res.send({ data: user });
  }
}
