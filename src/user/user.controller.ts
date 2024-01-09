import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthUserData } from 'src/auth/decorator/auth-user-data.decorator';
import { ServiceUserDto } from 'src/auth/dto/service-user.dto';

import { TokenAuthGuard } from 'src/auth/token-auth.guard';

@Controller('/user')
export class UserController {
  // TODO: 테스트용 엔드포인트 지우기
  @Get('/require/auth')
  @UseGuards(TokenAuthGuard)
  getAuthHello(@AuthUserData() user: ServiceUserDto): string {
    return `Hello, authorized user ${user.userId}!`;
  }
}
