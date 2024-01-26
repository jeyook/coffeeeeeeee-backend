import { User } from 'src/entity/user.entity';
import { Provider } from '../../entity/provider.entity';
import { UserRole } from '../../entity/user-role.entity';

interface ProviderDto {
  id: number;
}

interface UserRoleDto {
  id: number;
}

export class UserResponseDto {
  private id: number;
  private nickname: string;
  private email: string;
  private socialId: string;
  private provider: ProviderDto;
  private userRole: UserRoleDto;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.email = user.email;
    this.socialId = user.socialId;
    this.provider = this.mapProviderToDto(user.provider);
    this.userRole = this.mapUserRoleToDto(user.userRole);
  }

  private mapProviderToDto = (provider: Provider) => ({ id: provider.id });
  private mapUserRoleToDto = (userRole: UserRole) => ({ id: userRole.id });

  getId = () => this.id;
}
