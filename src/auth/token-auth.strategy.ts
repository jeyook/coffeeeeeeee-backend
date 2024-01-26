import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../entity/user.entity';

@Injectable()
export class TokenAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any): Promise<User> {
    const userId = payload.aud;
    const userDto = await this.userService.findUserById(userId);
    if (!userDto) throw new NotFoundException('USER_NOT_FOUND');
    const user = userDto.toEntity();
    return user;
  }
}
