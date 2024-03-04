// import { Test, TestingModule } from '@nestjs/testing';
// import { Response } from 'express';
// import { AuthController } from './auth.controller';
// import { AuthGuard } from '@nestjs/passport';
// import { GoogleOAuthStrategy } from './google-oauth.strategy';
// import { KakaoOAuthStrategy } from './kakao-oauth.strategy';

// describe('AuthController', () => {
//   let controller: AuthController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//     }).compile();

//     controller = module.get<AuthController>(AuthController);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('guards should be applied', async () => {
//     const googleOAuth = Reflect.getMetadata('__guards__', AuthController.prototype.googleOAuth);
//     const googleOAuthGuard = new googleOAuth[0]();

//     expect(googleOAuthGuard).toBeInstanceOf(AuthGuard('google'));

//     const googleOAuthCallback = Reflect.getMetadata(
//       '__guards__',
//       AuthController.prototype.googleOAuthCallback,
//     );
//     const googleOAuthCallbackGuard = new googleOAuthCallback[0]();

//     expect(googleOAuthCallbackGuard).toBeInstanceOf(AuthGuard('google'));

//     const kakaoOAuth = Reflect.getMetadata('__guards__', AuthController.prototype.kakaoOAuth);
//     const kakaoOAuthGuard = new kakaoOAuth[0]();

//     expect(kakaoOAuthGuard).toBeInstanceOf(AuthGuard('kakao'));
//   });

//   // authController.googleOAuth는 e2e test로 진행

//   describe('googleOAuthCallback', () => {
//     it('SUCCESS', async () => {
//       const user = { token: 'token' };
//       const expectedResult = {
//         statusCode: 200,
//         message: 'LOGIN_SUCCESS',
//         data: {
//           token: 'token',
//         },
//       };
//       const response: Response = {
//         send: jest.fn(() => expectedResult),
//       } as any;

//       const result = await controller.googleOAuthCallback(user, response);

//       expect(result).toEqual(expectedResult);
//       expect(response.send).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe('kakaoOAuth', () => {
//     it('SUCCESS', async () => {
//       const user = { token: 'token' };
//       const expectedResult = {
//         statusCode: 200,
//         message: 'LOGIN_SUCCESS',
//         data: {
//           token: 'token',
//         },
//       };
//       const response: Response = {
//         send: jest.fn(() => expectedResult),
//       } as any;

//       const result = await controller.kakaoOAuth(user, response);

//       expect(result).toEqual(expectedResult);
//       expect(response.send).toHaveBeenCalledTimes(1);
//     });
//   });
// });
