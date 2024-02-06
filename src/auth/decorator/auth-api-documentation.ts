import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiFoundResponse, ApiOperation } from '@nestjs/swagger';

export function ApiDocumentation(): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ): TypedPropertyDescriptor<any> | void => {
    return applyDecorators(...decorators[key])(target, key, descriptor);
  };
}

const decorators = {
  googleOAuth: [
    ApiOperation({
      summary: 'googleOAuth',
      description:
        'Google OAuth2 로그인을 호출한다. Google OAuth2 로그인이 완료되면 유저정보와 서비스 토큰을 반환한다.',
    }),
    ApiFoundResponse({
      status: 302,
      description: 'Google OAuth2 url로 리디렉션',
    }),
    ApiCreatedResponse({
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
    }),
  ],
  kakaoOAuth: [
    ApiOperation({
      summary: 'kakaoOAuth',
      description:
        'Kakao OAuth2 로그인을 호출한다. Kakao OAuth2 로그인이 완료되면 유저정보와 서비스 토큰을 발행한다.',
    }),
    ApiFoundResponse({
      status: 302,
      description: 'Kakao OAuth2 url로 리디렉션',
    }),
    ApiCreatedResponse({
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
    }),
  ],
};
