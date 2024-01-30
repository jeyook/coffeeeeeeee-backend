import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { OAuthUserDto } from '../auth/dto/oauth-user.dto';

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, 
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserByEmail', () => {
    const provider = {
      id: 1,
      name: 'provider',
    };
    const userRole = {
      id: 1,
      role: 'role',
    };
    const user = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
      provider: provider,
      userRole: userRole,
    };
    const email = 'test@test.com';

    it('SUCCESS', async () => {
      const spyUserFindOne = jest.spyOn(mockUserRepository, 'findOne');
      spyUserFindOne.mockResolvedValueOnce(user);

      const result = await service.findUserByEmail(email);

      expect(result).toEqual(user);
      expect(spyUserFindOne).toHaveBeenCalledWith({
        where: {
          email: email,
        },
        relations: {
          userRole: true,
          provider: true,
        },
      });
    });
  });

  describe('findUserById', () => {
    const provider = {
      id: 1,
      name: 'provider',
    };
    const userRole = {
      id: 1,
      role: 'role',
    };
    const user = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
      provider: provider,
      userRole: userRole,
    };
    const id = 1;

    it('SUCCESS', async () => {
      const spyUserFindOne = jest.spyOn(mockUserRepository, 'findOne');
      spyUserFindOne.mockResolvedValueOnce(user);

      const result = await service.findUserById(id);

      expect(result).toEqual(user);
      expect(spyUserFindOne).toHaveBeenCalledWith({
        where: {
          id: id,
        },
        relations: {
          userRole: true,
          provider: true,
        },
      });
    });
  });

  describe('findUserBySocialId', () => {
    const provider = {
      id: 1,
      name: 'provider',
    };
    const userRole = {
      id: 1,
      role: 'role',
    };
    const socialId = 'test1234';
    const providerName = 'provider';
    const user = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: socialId,
      provider: provider,
      userRole: userRole,
    };

    it('SUCCESS', async () => {
      const spyUserFindOne = jest.spyOn(mockUserRepository, 'findOne');
      spyUserFindOne.mockResolvedValueOnce(user);

      const result = await service.findUserBySocialId(socialId, providerName);

      expect(result).toEqual(user);
      expect(spyUserFindOne).toHaveBeenCalledWith({
        where: {
          socialId: socialId,
          provider: {
            name: providerName,
          },
        },
        relations: {
          userRole: true,
          provider: true,
        },
      });
    });
  });

  describe('signUpOAuth', () => {
    const provider = {
      id: 1,
      name: 'provider',
    };
    const userRole = {
      id: 1,
      role: 'role',
    };
    const socialId = 'test1234';
    const providerName = 'provider';
    const userData = new OAuthUserDto('test@test.com', '테스트', providerName, socialId);
    const newUser = {
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
      provider: provider,
      userRole: userRole,
    };
    const createdUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
      provider: provider,
      userRole: userRole,
    };

    it('SUCCESS', async () => {
      const spyUserSave = jest.spyOn(mockUserRepository, 'save');
      spyUserSave.mockResolvedValueOnce(createdUser);

      const spyToEntity = jest.spyOn(userData, 'toEntity');
      spyToEntity.mockReturnValueOnce(newUser as User);

      const result = await service.signUpOAuth(userData, provider, userRole);

      expect(result).toEqual(createdUser);
      expect(spyToEntity).toHaveBeenCalledWith(provider, userRole);
      expect(spyUserSave).toHaveBeenCalledWith(newUser);
    });
  });
});
