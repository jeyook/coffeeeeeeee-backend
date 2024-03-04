import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { ConfigService } from '@nestjs/config';
import { BookmarkService } from './bookmark.service';
import { User } from '../entity/user.entity';
import { PageRequestDto } from '../common/dto/page-request.dto';
import { BookmarkResponseDto } from './dto/bookmark-resposnse.dto';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { PageResponseDto } from '../common/dto/page-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';

describe('BookmarkController', () => {
  let bookmarkController: BookmarkController;

  const mockBookmarkService = {
    createBookmark: jest.fn(),
    getPaginatedBookmark: jest.fn(),
    deleteBookmark: jest.fn(),
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

  describe('getPaginatedBookmark()', () => {
    const mockUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
    };
    const mockCafe = {
      id: 1,
      name: '테스트 카페',
    };
    const mockPageRequestDto = {
      pageNo: 1,
      pageSize: 10,
    };
    const mockBookmarkResponseDto = {
      //mock data 작성
      user: mockUser,
      cafe: mockCafe,
    };

    const mockPageResponseDto = {
      currentPage: 1,
      pageSize: 10,
      totalCount: 20,
      totalPage: 2,
      items: [mockBookmarkResponseDto],
    };

    it('SUCCESS : 북마크를 정상적으로 조회.', async () => {
      const spyGetPaginatedBookmarkFn = jest.spyOn(mockBookmarkService, 'getPaginatedBookmark');

      spyGetPaginatedBookmarkFn.mockResolvedValueOnce(mockPageResponseDto);

      const expectedResult = {
        message: 'READ_SUCCESS',
        statusCode: 200,
        data: mockPageResponseDto,
      };

      // When
      const result = await bookmarkController.getPaginatedBookmark(
        mockUser as User,
        mockPageRequestDto as PageRequestDto,
      );

      // Then
      expect(result).toEqual(expectedResult);
      expect(spyGetPaginatedBookmarkFn).toHaveBeenCalledTimes(1);
      expect(mockBookmarkService.getPaginatedBookmark).toHaveBeenCalledWith(
        mockUser,
        mockPageRequestDto,
      );
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
      name: '테스트 카페',
    };
    const mockBookmarkResponseDto = {
      //mock data 작성
      user: mockUser,
      cafe: mockCafe,
    };

    it('SUCCESS: 북마크를 정상적으로 삭제', async () => {
      // Given
      const spyDeleteBookmarkFn = jest.spyOn(mockBookmarkService, 'deleteBookmark');
      spyDeleteBookmarkFn.mockResolvedValueOnce({ affected: 1 });

      // When
      const result = await mockBookmarkService.deleteBookmark(mockUser as User, mockCafeId);

      // Then
      expect(result).toBeUndefined();
      expect(spyDeleteBookmarkFn).toHaveBeenCalledTimes(1);
    });
  });
});
