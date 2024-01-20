import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Response } from 'express';

import { AuthUserData } from './decorator/auth-user-data.decorator';
import { OAuthUserDto } from './dto/oauth-user.dto';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';

@Controller('/auth')
export class AuthController {
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleOAuth() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleOAuthCallback(
    @AuthUserData() user: OAuthUserDto & { token: string },
    @Res() res: Response,
  ) {
    res.send(CommonResponseDto.success(ResponseMessage.LOGIN_SUCCESS, user));
  }

  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoOAuth(@AuthUserData() user: OAuthUserDto & { token: string }, @Res() res: Response) {
    res.send(CommonResponseDto.success(ResponseMessage.LOGIN_SUCCESS, user));
  }
}
