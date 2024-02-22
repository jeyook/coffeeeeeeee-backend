import { User } from '../../entity/user.entity';
import { Provider } from '../../entity/provider.entity';
import { UserRole } from '../../entity/user-role.entity';

interface ProviderDto {
  id: number;
  name: string;
}

interface UserRoleDto {
  id: number;
  role: string;
}

export class UserResponseDto {
  private id: number;
  private nickname: string;
  private email: string;
  private socialId: string;
  private provider: ProviderDto;
  private userRole: UserRoleDto;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor(user: User) {
    if (user) {
      this.id = user.id;
      this.nickname = user.nickname;
      this.email = user.email;
      this.socialId = user.socialId;
      this.provider = this.mapProviderToDto(user.provider);
      this.userRole = this.mapUserRoleToDto(user.userRole);
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
      this.deletedAt = user.deletedAt;
    }
  }

  private static mapProviderToDto = (provider: Provider) => provider;
  private static mapUserRoleToDto = (userRole: UserRole) => userRole;

  toEntity(): User {
    const user = new User();
    user.id = this.id;
    user.email = this.email;
    user.nickname = this.nickname;
    user.provider = this.provider;
    user.userRole = this.userRole;
    user.socialId = this.socialId;
    user.createdAt = this.createdAt;
    user.updatedAt = this.updatedAt;
    user.deletedAt = this.deletedAt;
    return user;
  }
}
