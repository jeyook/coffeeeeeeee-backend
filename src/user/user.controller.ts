import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthUserData } from '../auth/decorator/auth-user-data.decorator';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { User } from '../entity/user.entity';

@Controller('/user')
export class UserController {
  // TODO: 테스트용 엔드포인트 지우기
  @Get('/require/auth')
  @UseGuards(TokenAuthGuard)
  getAuthHello(@AuthUserData() user: User) {
    return {
      message: `Hello, authorized user ${user.id}!`,
      user,
    };
  }

  // TODO: test용 엔드포인트 지우기
  @Get('/require/auth/optional')
  @UseGuards(new TokenAuthGuard({ isTokenOptional: false }))
  getAuthOptionalHello(@AuthUserData() user: User) {
    return {
      message: `Hello, user!`,
      user,
    };
  }
}
