import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from '../entity/bookmark.entity';
import { Cafe } from '../entity/cafe.entity';
import { User } from '../entity/user.entity';
import { HttpStatus, NotFoundException } from '@nestjs/common';

describe('BookmarkService', () => {
  let bookmarkService: BookmarkService;

  const mockBookmarkRepository = {
    save: jest.fn(),
    create: jest.fn(),
  };
  const mockCafeRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarkService,
        {
          provide: getRepositoryToken(Bookmark),
          useValue: mockBookmarkRepository,
        },
        {
          provide: getRepositoryToken(Cafe),
          useValue: mockCafeRepository,
        },
      ],
    }).compile();

    bookmarkService = module.get<BookmarkService>(BookmarkService);
  });

  it('should be defined', () => {
    expect(bookmarkService).toBeDefined();
  });

  describe('createBookmark()', () => {
    const mockUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
    };
    const mockCafeId = 1;
    const mockCafe = {
      cafeId: mockCafeId,
      placeId: 1,
      address: '주소',
      name: '목카페',
      mapX: 123,
      mapY: 456,
      phoneNumber: '010-1234-5678',
      imageUrl: 'https://image.imgage',
      homepageUrl: 'https://homepage.homepage',
    };

    it('SUCCESS: 북마크를 정상적으로 추가한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(mockCafe);
      const spyBookmarkSaveByFn = jest.spyOn(mockBookmarkRepository, 'save');

      // When
      const result = await bookmarkService.createBookmark(mockUser as User, mockCafeId);

      // Then
      expect(result).toBeUndefined();
      expect(spyCafeFindOneByFn).toHaveBeenCalledTimes(1);
      expect(spyCafeFindOneByFn).toHaveBeenCalledWith({ id: mockCafeId });
      expect(spyBookmarkSaveByFn).toHaveBeenCalledTimes(1);
    });

    it('FAILURE: 검색할 카페가 존재하지 않으면 Not Found Exception을 반환한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockReturnValueOnce(undefined);

      // When
      let hasThrown = false;
      try {
        await bookmarkService.createBookmark(mockUser as User, mockCafeId);

        // Then
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
        expect(error.getResponse()).toEqual({
          error: 'Not Found',
          message: 'NOT_FOUND_CAFE',
          statusCode: 404,
        });
      }
      expect(hasThrown).toBeTruthy();
    });
  });
});