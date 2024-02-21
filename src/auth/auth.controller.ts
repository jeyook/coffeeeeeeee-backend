import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Response } from 'express';

import { AuthUserData } from './decorator/auth-user-data.decorator';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ApiDocumentation } from './decorator/auth-api-documentation';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  @ApiDocumentation()
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleOAuth() {}

  @ApiExcludeEndpoint() // not allowed to direct call
  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleOAuthCallback(
    // TODO: 실제로는 token만 들어오고 있음. 실제 데이터에 맞게 변경하거나, user data를 추가해주거나
    @AuthUserData() user: { token: string },
    @Res() res: Response,
  ) {
    res.cookie('token', user.token);
    res.redirect(process.env.OAUTH_REDIRECT_URL_ON_CLIENT);
  }

  @ApiDocumentation()
  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoOAuth(
    // TODO: 실제로는 token만 들어오고 있음. 실제 데이터에 맞게 변경하거나, user data를 추가해주거나
    @AuthUserData() user: { token: string },
    @Res() res: Response,
  ) {
    res.cookie('token', user.token);
    res.redirect(process.env.OAUTH_REDIRECT_URL_ON_CLIENT);
  }

  // TODO: logout API 만들기
}
