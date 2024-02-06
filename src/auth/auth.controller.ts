import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Response } from 'express';

import { AuthUserData } from './decorator/auth-user-data.decorator';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import {
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  @ApiOperation({
    summary: 'googleOAuth',
    description:
      'Google OAuth2 로그인을 호출한다. Google OAuth2 로그인이 완료되면 유저정보와 서비스 토큰을 반환한다.',
  })
  @ApiFoundResponse({
    status: 302,
    description: 'Google OAuth2 url로 리디렉션',
  })
  @ApiCreatedResponse({
    description: '유저정보와 서비스 토큰 반환',
    schema: {
      example: {
        statusCode: 200,
        message: 'LOGIN_SUCCESS',
        data: {
          token: 'login_token_keep_it_in_safe_place',
        },
      },
    },
  })
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
    return res.send(CommonResponseDto.success(ResponseMessage.LOGIN_SUCCESS, user));
  }

  @ApiOperation({
    summary: 'kakaoOAuth',
    description:
      'Kakao OAuth2 로그인을 호출한다. Kakao OAuth2 로그인이 완료되면 유저정보와 서비스 토큰을 발행한다.',
  })
  @ApiFoundResponse({
    status: 302,
    description: 'Kakao OAuth2 url로 리디렉션',
  })
  @ApiCreatedResponse({
    description: '유저정보와 서비스 토큰 반환',
    schema: {
      example: {
        statusCode: 200,
        message: 'LOGIN_SUCCESS',
        data: {
          token: 'login_token_keep_it_in_safe_place',
        },
      },
    },
  })
  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoOAuth(
    // TODO: 실제로는 token만 들어오고 있음. 실제 데이터에 맞게 변경하거나, user data를 추가해주거나
    @AuthUserData() user: { token: string },
    @Res() res: Response,
  ) {
    return res.send(CommonResponseDto.success(ResponseMessage.LOGIN_SUCCESS, user));
  }

  // TODO: logout API 만들기
}
