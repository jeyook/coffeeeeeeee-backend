import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { Strategy, Profile } from 'passport-kakao';
import { Repository } from 'typeorm';

import { UserRole } from 'src/entity/user-role.entity';
import { Provider } from 'src/entity/provider.entity';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

import { OAuthUserDto } from './dto/oauth-user.dto';

@Injectable()
export class KakaoOAuthStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {
    super({
      clientID: process.env.OAUTH_KAKAO_CLIENT_ID,
      callbackURL: process.env.OAUTH_KAKAO_REDIRECT,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done) {
    const { id, displayName, _json } = profile;
    const socialId = String(id);
    const email = _json.kakao_account.email;

    let user = await this.userService.findUserBySocialId(socialId, 'kakao');
    if (!user) {
      const userData = new OAuthUserDto(email, displayName, 'kakao', socialId);
      const provider = await this.providerRepository.findOne({
        where: { name: userData.providerName },
      });
      const userRole = await this.userRoleRepository.findOne({
        where: { role: 'user' },
      });
      user = await this.userService.signUpOAuth(userData, provider, userRole);
    }

    const token = this.authService.sign({ aud: user.getId() });

    done(null, { token: token });
  }
}
