import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthUserData } from 'src/auth/decorator/auth-user-data.decorator';
import { TokenRequirement } from 'src/auth/dto/token-requirement.enum';

import { TokenAuthGuard } from 'src/auth/token-auth.guard';
import { User } from 'src/entity/user.entity';

@Controller('/user')
export class UserController {
  // TODO: 테스트용 엔드포인트 지우기
  @Get('/require/auth')
  @UseGuards(TokenAuthGuard)
  getAuthHello(@AuthUserData() user: User) {
    return {
      message: `Hello, authorized user ${user.id}!`,
      ...user,
    };
  }

  @Get('/require/auth/optional')
  @UseGuards(new TokenAuthGuard(TokenRequirement.OPTIONAL))
  getAuthOptionalHello(@AuthUserData() user: User) {
    return {
      message: `Hello, user!`,
      ...user,
    };
  }
}
