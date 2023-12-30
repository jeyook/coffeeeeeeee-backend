import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
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
    const user = {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      email: emails[0].value,
    };
    done(null, user);
  }
}
