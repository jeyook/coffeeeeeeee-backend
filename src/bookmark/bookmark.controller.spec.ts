import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { ConfigService } from '@nestjs/config';
import { BookmarkService } from './bookmark.service';
import { User } from '../entity/user.entity';

describe('BookmarkController', () => {
  let bookmarkController: BookmarkController;

  const mockBookmarkService = {
    createBookmark: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [ConfigService, { provide: BookmarkService, useValue: mockBookmarkService }],
    }).compile();
    bookmarkController = module.get<BookmarkController>(BookmarkController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(bookmarkController).toBeDefined();
  });

  describe('createBookmark()', () => {
    const mockUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
    };
    const mockCafeId = 1;

    it('SUCCESS : 북마크를 정상적으로 추가.', async () => {
      const spyCreateBookmarkFn = jest.spyOn(mockBookmarkService, 'createBookmark');
      spyCreateBookmarkFn.mockReturnValueOnce(null);

      const expectedResult = {
        message: 'CREATE_SUCCESS',
        statusCode: 201,
      };

      // When
      const result = await bookmarkController.createBookmark(mockUser as User, mockCafeId);

      // Then
      expect(result).toEqual(expectedResult);
      expect(spyCreateBookmarkFn).toHaveBeenCalledTimes(1);
    });
  });
});