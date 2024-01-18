import { User } from 'src/entity/user.entity';
import { Provider } from '../../entity/provider.entity';
import { UserRole } from '../../entity/user-role.entity';

export class UserResponseDto {
  private id: number;
  private nickname: string;
  private email: string;
  private socialId: string;
  private provider: Provider;
  private userRole: UserRole;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.email = user.email;
    this.socialId = user.socialId;
    this.provider = user.provider;
    this.userRole = user.userRole;
  }
}
