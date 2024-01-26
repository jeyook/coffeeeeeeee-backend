import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('verify', () => {
    const tokenPayload = {
      aud: 1,
      iat: 1705700000000,
      exp: 1705800000000,
    };

    const token = 'testToken';

    it('SUCCESS: token을 검증하여 리턴', async () => {
      const spyVerify = jest.spyOn(jwtService, 'verify');
      spyVerify.mockReturnValueOnce(tokenPayload);

      const result = service.verify(token);

      expect(result).toEqual(tokenPayload);
      expect(spyVerify).toHaveBeenCalledTimes(1);
      expect(spyVerify).toHaveBeenCalledWith(token);
    });
  });

  describe('sign', () => {
    const tokenPayload = {
      aud: 1,
      iat: 1705700000000,
      exp: 1705800000000,
    };

    const token = 'testToken';

    it('SUCCESS: token을 검증하여 리턴', async () => {
      const spySign = jest.spyOn(jwtService, 'sign');
      spySign.mockReturnValueOnce(token);

      const result = service.sign(tokenPayload);

      expect(result).toEqual(token);
      expect(spySign).toHaveBeenCalledTimes(1);
      expect(spySign).toHaveBeenCalledWith(tokenPayload);
    });
  });
});
