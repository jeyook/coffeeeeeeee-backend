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

  async signUpOAuth(userData: OAuthUserDto, provider: Provider, userRole: UserRole) {
    return await this.userRepository.save(userData.toEntity(provider, userRole));
  }
}
