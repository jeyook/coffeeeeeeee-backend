import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Review } from '../entity/review.entity';
import { User } from '../entity/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

describe('ReviewController', () => {
  let reviewController: ReviewController;

  const mockReviewService = {
    createReview: jest.fn(),
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
      spyCreateReviewFn.mockReturnValueOnce(null);

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
    });
  });
});
