import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenRequirement } from './dto/token-requirement.enum';

@Injectable()
export class TokenAuthGuard extends AuthGuard('jwt') {
  constructor(tokenRequirement: TokenRequirement = TokenRequirement.REQUIRED) {
    super();
    if (tokenRequirement === TokenRequirement.OPTIONAL) {
      this.handleRequest = function handleRequest<TUser = any>(err: any, user: any): TUser {
        return user;
      };
    }
  }
}
