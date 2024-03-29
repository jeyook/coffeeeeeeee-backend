import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PageRequestDto } from '../common/dto/page-request.dto';
import { Review } from '../entity/review.entity';
import { User } from '../entity/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

describe('ReviewController', () => {
  let reviewController: ReviewController;

  const mockReviewService = {
    createReview: jest.fn(),
    getPaginatedReview: jest.fn(),
    updateReview: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        ConfigService,
        {
          provide: ReviewService,
          useValue: mockReviewService,
        },
      ],
    }).compile();

    reviewController = module.get<ReviewController>(ReviewController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(reviewController).toBeDefined();
  });

  describe('createReview()', () => {
    const mockUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
    };
    const mockCafeId = 1;
    const mockImages = [
      {
        location: 'test',
        etag: 'test',
        stream: null,
        destination: 'test',
        filename: 'test',
        path: 'test',
      },
    ];
    const mockTagId = 1;
    const mockCreateDto = {
      rating: 1,
      content: '테스트입니다.',
      tagIds: [mockTagId],
      toEntity: function (): Review {
        return new Review();
      },
    };

    it('SUCCESS: 리뷰를 정상적으로 생성한다.', async () => {
      // Given
      const spyCreateReviewFn = jest.spyOn(mockReviewService, 'createReview');

      const expectedResult = {
        message: 'CREATE_SUCCESS',
        statusCode: 201,
      };

      // When
      const result = await reviewController.createReview(
        mockUser as User,
        mockCafeId,
        mockImages as Express.MulterS3.File[],
        mockCreateDto as CreateReviewDto,
      );

      // Then
      expect(result).toEqual(expectedResult);
      expect(spyCreateReviewFn).toHaveBeenCalledTimes(1);
      expect(spyCreateReviewFn).toHaveBeenCalledWith(
        mockUser,
        mockCafeId,
        mockImages,
        mockCreateDto,
      );
    });
  });

  describe('getPaginatedReview()', () => {
    const mockCafeId = 1;
    const mockPageRequestDto = {
      pageNo: 1,
      pageSize: 10,
    };
    const mockReviewResponseDto = {
      id: 1,
      rating: 1,
      content: '테스트입니다.',
      createdDate: '2021-08-16T18:00:00.000Z',
      modifiedDate: '2021-08-16T18:00:00.000Z',
    };
    const mockPageResponseDto = {
      currentPage: 1,
      pageSize: 10,
      totalCount: 20,
      totalPage: 2,
      items: [mockReviewResponseDto],
    };

    it('SUCCESS: 리뷰를 정상적으로 조회한다.(요청값으로 유저 받음)', async () => {
      // Given
      const mockUser = {
        id: 1,
        nickname: '테스트',
        email: 'test@test.com',
        socialId: 'test1234',
      };
      const spyGetPaginatedReviewFn = jest.spyOn(mockReviewService, 'getPaginatedReview');
      spyGetPaginatedReviewFn.mockResolvedValueOnce(mockPageResponseDto);

      const expectedResult = {
        message: 'READ_SUCCESS',
        statusCode: 200,
        data: mockPageResponseDto,
      };

      // When
      const result = await reviewController.getPaginatedReview(
        mockCafeId,
        mockPageRequestDto as PageRequestDto,
        mockUser as User,
      );

      // Then
      expect(result).toEqual(expectedResult);
      expect(spyGetPaginatedReviewFn).toHaveBeenCalledTimes(1);
      expect(spyGetPaginatedReviewFn).toHaveBeenCalledWith(
        mockCafeId,
        mockPageRequestDto,
        mockUser,
      );
    });

    it('SUCCESS: 리뷰를 정상적으로 조회한다.(요청값으로 유저 안 받음)', async () => {
      // Given
      const mockUser = null;
      const spyGetPaginatedReviewFn = jest.spyOn(mockReviewService, 'getPaginatedReview');
      spyGetPaginatedReviewFn.mockResolvedValueOnce(mockPageResponseDto);

      const expectedResult = {
        message: 'READ_SUCCESS',
        statusCode: 200,
        data: mockPageResponseDto,
      };

      // When
      const result = await reviewController.getPaginatedReview(
        mockCafeId,
        mockPageRequestDto as PageRequestDto,
        mockUser,
      );

      // Then
      expect(result).toEqual(expectedResult);
      expect(spyGetPaginatedReviewFn).toHaveBeenCalledTimes(1);
      expect(spyGetPaginatedReviewFn).toHaveBeenCalledWith(
        mockCafeId,
        mockPageRequestDto,
        mockUser,
      );
    });
  });

  describe('updateReview()', () => {
    const mockCafeId = 1;
    const mockUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
    };
    const mockReviewId = 1;
    const mockImages = [
      {
        location: 'test',
        etag: 'test',
        stream: null,
        destination: 'test',
        filename: 'test',
        path: 'test',
      },
    ];
    const mockUpdateReviewDto = {
      rating: 1,
      content: '테스트입니다.',
      tagIds: [1],
    };

    it('SUCCESS: 리뷰를 정상적으로 수정한다.', async () => {
      // Given
      const spyUpdateReviewFn = jest.spyOn(mockReviewService, 'updateReview');

      const expectedResult = {
        message: 'UPDATE_SUCCESS',
        statusCode: 200,
      };

      // When
      const result = await reviewController.updateReview(
        mockUser as User,
        mockCafeId,
        mockReviewId,
        mockImages as Express.MulterS3.File[],
        mockUpdateReviewDto as UpdateReviewDto,
      );

      // Then
      expect(result).toEqual(expectedResult);
      expect(spyUpdateReviewFn).toHaveBeenCalledTimes(1);
      expect(spyUpdateReviewFn).toHaveBeenCalledWith(
        mockUser,
        mockCafeId,
        mockReviewId,
        mockImages,
        mockUpdateReviewDto,
      );
    });
  });
});
