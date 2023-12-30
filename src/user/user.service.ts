import { Injectable } from '@nestjs/common';
import { Provider } from 'src/entity/provider.entity';
import { UserRole } from 'src/entity/user-role.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserService {
  // test data
  private readonly users: User[] = [
    {
      id: 1,
      email: 'coffeeeeeeee2023@gmail.com',
      nickname: 'coffeeeeeeee',
      socialId: '1',
      provider: new Provider(),
      userRole: new UserRole(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
    {
      id: 2,
      email: 'account@email.com',
      nickname: 'test',
      socialId: '2',
      provider: new Provider(),
      userRole: new UserRole(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
