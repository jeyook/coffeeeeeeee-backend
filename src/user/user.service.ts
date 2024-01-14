import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Provider } from 'src/entity/provider.entity';
import { UserRole } from 'src/entity/user-role.entity';
import { User } from 'src/entity/user.entity';

import { OAuthUserDto } from 'src/auth/dto/oauth-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        userRole: true,
        provider: true,
      },
    });
    return user;
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        userRole: true,
        provider: true,
      },
    });
    return user;
  }

  async findUserBySocialId(socialId: string, provider: string) {
    const user = await this.userRepository.findOne({
      where: {
        socialId: socialId,
        provider: {
          name: provider,
        },
      },
      relations: {
        userRole: true,
        provider: true,
      },
    });
    return user;
  }

  async signUpOAuth(userData: OAuthUserDto, provider: Provider, userRole: UserRole) {
    const user = userData.toEntity(provider, userRole);
    return await this.userRepository.save(user);
  }
}
