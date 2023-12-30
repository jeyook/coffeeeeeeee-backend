import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/type/token-payload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string) {
    const user = await this.userService.findOne(email);
    return user;
  }

  googleLogin(req) {
    if (!req.user) {
      // TODO: 적절한 예외처리
      return 'No user from google';
    }

    // TODO: 유저 확인
    // 유저 없으면 등록 후 리턴
    // 유저 있으면 유저 정보 리턴
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  verify(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }

  sign(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }
}
