import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private userService: UserService,
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

    let user = await this.userService.findUserByEmail(email);
    if (!user) {
      const userSignUpDto = {
        email: email,
        providerName: 'google',
        socialId: id,
        nickname: name.givenName,
      };
      user = await this.userService.signUpOAuth(userSignUpDto);
    }

    const token = this.authService.sign({ aud: user.id });

    done(null, { ...user, token: token });
  }
}
