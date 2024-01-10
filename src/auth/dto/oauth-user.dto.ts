import { Provider } from 'src/entity/provider.entity';
import { UserRole } from 'src/entity/user-role.entity';
import { User } from 'src/entity/user.entity';

export class OAuthUserDto {
  readonly email: string;
  readonly nickname: string;
  readonly socialId: string;
  readonly providerName: string;

  constructor(email: string, nickname: string, providerName?: string, socialId?: string) {
    this.email = email;
    this.nickname = nickname;
    this.providerName = providerName;
    this.socialId = socialId;
  }

  toEntity(provider: Provider, userRole: UserRole): User {
    const user = new User();
    user.email = this.email;
    user.nickname = this.nickname;
    user.provider = provider;
    user.userRole = userRole;
    return user;
  }
}
