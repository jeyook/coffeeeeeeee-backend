import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiFoundResponse, ApiOperation } from '@nestjs/swagger';

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
        'Google OAuth2 로그인을 호출한다. Google OAuth2 로그인이 완료되면 서비스 토큰을 cookie로 반환한다.',
    }),
    ApiCookieAuth(),
    ApiFoundResponse({
      status: 302,
      description: 'Token을 cookie에 할당하여 main page로 리디렉션',
    }),
  ],
  kakaoOAuth: [
    ApiOperation({
      summary: 'kakaoOAuth',
      description:
        'Kakao OAuth2 로그인을 호출한다. Kakao OAuth2 로그인이 완료되면 서비스 토큰을 cookie로 발행한다.',
    }),
    ApiCookieAuth(),
    ApiFoundResponse({
      status: 302,
      description: 'Token을 cookie에 할당하여 main page로 리디렉션',
    }),
  ],
};
