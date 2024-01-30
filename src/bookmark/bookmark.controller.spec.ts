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
    const mockPageRequestDto: PageRequestDto = new PageRequestDto();

    const mockBookmarkResponseDto: BookmarkResponseDto[] = [];

    it('SUCCESS : 북마크를 정상적으로 조회.', async () => {
      // mockBookmarkService.getPaginatedBookmark.mockResolvedValueOnce(mockBookmarkResponseDto);

      const mockdata = mockBookmarkService.getPaginatedBookmark.mockResolvedValueOnce(
        new PageResponseDto<BookmarkResponseDto>(
          1,
          mockBookmarkResponseDto.length,
          mockBookmarkResponseDto.length,
          mockBookmarkResponseDto,
        ),
      );

      // Expected result
      const expectedResult: CommonResponseDto<PageResponseDto<BookmarkResponseDto>> = {
        message: ResponseMessage.READ_SUCCESS,
        statusCode: 200,
        data: {
          items: mockBookmarkResponseDto,
          totalCount: mockBookmarkResponseDto.length,
        },
      };

      // When
      const result = await bookmarkController.getPaginatedBookmark(
        mockUser as User,
        mockPageRequestDto,
      );

      // Then
      expect(result).toEqual(expectedResult);
      expect(mockBookmarkService.getPaginatedBookmark).toHaveBeenCalledWith(
        mockUser,
        mockPageRequestDto,
      );
    });
  });
});
