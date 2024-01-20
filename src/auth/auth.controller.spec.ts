import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthGuard } from '@nestjs/passport';

describe('AuthController', () => {
  let controller: AuthController;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('guards should be applied', async () => {
    const googleOAuth = Reflect.getMetadata('__guards__', AuthController.prototype.googleOAuth);
    const googleOAuthGuard = new (googleOAuth[0]);
  
    expect(googleOAuthGuard).toBeInstanceOf(AuthGuard('google'));

    const googleOAuthCallback = Reflect.getMetadata('__guards__', AuthController.prototype.googleOAuthCallback);
    const googleOAuthCallbackGuard = new (googleOAuthCallback[0]);
  
    expect(googleOAuthCallbackGuard).toBeInstanceOf(AuthGuard('google'));

    const kakaoOAuth = Reflect.getMetadata('__guards__', AuthController.prototype.kakaoOAuth);
    const kakaoOAuthGuard = new (kakaoOAuth[0]);
  
    expect(kakaoOAuthGuard).toBeInstanceOf(AuthGuard('kakao'));
  });
});
