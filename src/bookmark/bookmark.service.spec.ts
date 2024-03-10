import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from '../entity/bookmark.entity';
import { Cafe } from '../entity/cafe.entity';
import { User } from '../entity/user.entity';
import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';
import { PageRequestDto } from '../common/dto/page-request.dto';

describe('BookmarkService', () => {
  let bookmarkService: BookmarkService;

  const mockBookmarkRepository = {
    save: jest.fn(),
    create: jest.fn(),
    findAndCount: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
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

  afterEach(() => {
    jest.clearAllMocks();
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

  describe('getPaginatedBookmark()', () => {
    const mockUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
    };
    const mockCafe = {
      id: 1,
      placeId: 1,
      address: '주소',
      name: '목카페',
      mapX: 123,
      mapY: 456,
      phoneNumber: '010-1234-5678',
      imageUrl: 'https://image.imgage',
      homepageUrl: 'https://homepage.homepage',
    };
    const mockPageRequestDto = {
      pageNo: 2,
      getOffset: function (): number {
        return 10;
      },
      getLimit: function (): number {
        return 10;
      },
    };
    const mockBookmarks = [
      {
        user: {
          id: 1,
        },
        cafe: {
          id: 1,
        },
      },
    ];
    const mockBookmarkResponseDto = {
      user: {
        id: 1,
      },
      cafe: {
        id: 1,
      },
    };
    let mockBookmarkTotalCount = 20;

    it('SUCCESS : 북마크를 정상적으로 조회한다.', async () => {
      // Given
      const spyBookmarkFindAndCountFn = jest.spyOn(mockBookmarkRepository, 'findAndCount');
      spyBookmarkFindAndCountFn.mockResolvedValueOnce([mockBookmarks, mockBookmarkTotalCount]);

      const expectedResult = {
        currentPage: mockPageRequestDto.pageNo,
        pageSize: mockPageRequestDto.getLimit(),
        totalCount: mockBookmarkTotalCount,
        totalPage: Math.ceil(mockBookmarkTotalCount / mockPageRequestDto.getLimit()),
        items: [mockBookmarkResponseDto],
      };

      //When
      const result = await bookmarkService.getPaginatedBookmark(
        mockUser as User,
        mockPageRequestDto as PageRequestDto,
      );

      //Then
      expect(result).toEqual(expectedResult);
      expect(spyBookmarkFindAndCountFn).toHaveBeenCalledTimes(1);
      expect(spyBookmarkFindAndCountFn).toHaveBeenCalledWith({
        where: {
          user: { id: mockUser.id },
        },
        take: mockPageRequestDto.getLimit(),
        skip: mockPageRequestDto.getOffset(),
      });
    });

    it('FAILURE: 검색할 북마크가 존재하지 않으면 Bad Request Exception을 반환한다.', async () => {
      // Given
      mockBookmarkTotalCount = 10;
      const spyBookmarkFindAndCountFn = jest.spyOn(mockBookmarkRepository, 'findAndCount');
      spyBookmarkFindAndCountFn.mockResolvedValueOnce([mockBookmarks, mockBookmarkTotalCount]);

      // When
      let hasThrown = false;
      try {
        await bookmarkService.getPaginatedBookmark(
          mockUser as User,
          mockPageRequestDto as PageRequestDto,
        );

        // Then
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.getResponse()).toEqual({
          error: 'Bad Request',
          message: 'PAGE_OUT_OF_RANGE',
          statusCode: 400,
        });
      }
      expect(hasThrown).toBeTruthy();
    });
  });

  describe('deleteBookmark()', () => {
    const mockUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
    };
    const mockCafeId = 1;

    const mockCafe = {
      id: 1,
      placeId: 1,
      address: '주소',
      name: '목카페',
      mapX: 123,
      mapY: 456,
      phoneNumber: '010-1234-5678',
      imageUrl: 'https://image.imgage',
      homepageUrl: 'https://homepage.homepage',
    };
    const mockBookmarkResponseDto = {
      user: mockUser,
      cafe: mockCafe,
    };

    it('SUCCESS : 북마크를 정상적으로 삭제.', async () => {
      // Given
      const spyFindOneByFn = jest.spyOn(mockBookmarkRepository, 'findOneBy');
      spyFindOneByFn.mockResolvedValueOnce(mockBookmarkResponseDto);

      const spyDeleteBookmarkFn = jest.spyOn(mockBookmarkRepository, 'delete');
      spyDeleteBookmarkFn.mockResolvedValueOnce(Promise.resolve({ affected: 1 }));

      // When
      const result = await bookmarkService.deleteBookmark(mockUser as User, mockCafeId);

      // Then
      expect(result).toBeUndefined();
      expect(spyDeleteBookmarkFn).toHaveBeenCalledTimes(1);
      expect(spyDeleteBookmarkFn).toHaveBeenCalledWith({
        user: mockUser,
        cafe: mockCafe,
      });
    });

    it('FAILURE: 삭제할 북마크가 존재하지 않으면 Not Found Exception을 반환한다.', async () => {
      // Given
      const spyBookmarkFindOneByFn = jest.spyOn(mockBookmarkRepository, 'findOneBy');
      spyBookmarkFindOneByFn.mockReturnValueOnce(undefined);

      // When
      let hasThrown = false;
      try {
        await bookmarkService.deleteBookmark(mockUser as User, mockCafeId);

        // Then
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
        expect(error.getResponse()).toEqual({
          error: 'Not Found',
          message: 'NOT_FOUND_BOOKMARK',
          statusCode: 404,
        });
      }
      expect(hasThrown).toBeTruthy();
    });
  });
});
