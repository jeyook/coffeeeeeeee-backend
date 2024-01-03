import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/entity/provider.entity';
import { UserRole } from 'src/entity/user-role.entity';
import { User } from 'src/entity/user.entity';
import { UserSignUpDto } from 'src/type/userDto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async signUpOAuth(userSignUpDto: UserSignUpDto) {
    const { providerName } = userSignUpDto;
    const userRole = await this.userRoleRepository.findOne({
      where: {
        role: 'user',
      },
    });
    const provider = await this.providerRepository.findOne({
      where: {
        name: providerName,
      },
    });
    const user = this.userRepository.create({
      ...userSignUpDto,
      userRole: userRole,
      provider: provider,
    });
    return await this.userRepository.save(user);
  }
}
