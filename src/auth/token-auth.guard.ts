import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TokenAuthGuard extends AuthGuard('jwt') {
  constructor(options: TokenAuthGuardOptions = { isTokenOptional: false }) {
    super();
    if (!options.isTokenOptional) {
      this.handleRequest = function handleRequest<TUser = any>(err: any, user: any): TUser {
        return user;
      };
    }
  }
}
