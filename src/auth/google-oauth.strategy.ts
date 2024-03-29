import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { Repository } from 'typeorm';

import { UserRole } from '../entity/user-role.entity';
import { Provider } from '../entity/provider.entity';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { OAuthUserDto } from './dto/oauth-user.dto';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {
    super({
      clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails } = profile;

    const email = emails[0].value;

    let userDto = await this.userService.findUserBySocialId(id, 'google');
    if (!userDto) {
      const userData = new OAuthUserDto(email, name.givenName, 'google', id);
      const provider = await this.providerRepository.findOne({
        where: { name: userData.providerName },
      });
      const userRole = await this.userRoleRepository.findOne({
        where: { role: 'user' },
      });
      userDto = await this.userService.signUpOAuth(userData, provider, userRole);
    }

    const user = userDto.toEntity();
    const token = this.authService.sign({ aud: user.id });

    done(null, { ...user, token: token });
  }
}
