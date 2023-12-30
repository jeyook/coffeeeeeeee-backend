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

  async googleLogin(
    req: Request & {
      user?: {
        provider: string;
        providerId: string;
        name: string;
        email: string;
      };
    },
  ) {
    const userData = req.user;
    if (!userData) {
      // TODO: 적절한 예외처리
      return 'No user from google';
    }

    // TODO: 유저 확인
    // 유저 없으면 등록 후 리턴
    // 유저 있으면 유저 정보 리턴
    // 을 여기서 하는게 맞나?
    let user = await this.userService.findUserByEmail(userData.email);
    if (!user) {
      const userSignUpDto = {
        email: userData.email,
        providerName: userData.provider,
        socialId: userData.providerId,
        nickname: userData.name,
      };
      user = await this.userService.signUpOAuth(userSignUpDto);
    }

    const token = this.sign({ aud: user.id });
    return {
      token: token,
    };
  }

  verify(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }

  sign(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }
}
