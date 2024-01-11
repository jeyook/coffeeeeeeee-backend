import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cafe } from '../entity/cafe.entity';
import { Review } from '../entity/review.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let reviewService: ReviewService;

  const mockReviewRepository = {
    save: jest.fn(),
  };
  const mockCafeRepository = {
    findOneBy: jest.fn(),
  };
  const mockTagRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
        {
          provide: getRepositoryToken(Cafe),
          useValue: mockCafeRepository,
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagRepository,
        },
      ],
    }).compile();

    reviewService = module.get<ReviewService>(ReviewService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
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
    const mockTag = {
      id: 1,
      name: '목태그',
      count: 1,
    };

    it('SUCCESS: 리뷰를 정상적으로 생성한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(mockCafe);
      const spyTagFindOneByFn = jest.spyOn(mockTagRepository, 'findOneBy');
      spyTagFindOneByFn.mockResolvedValueOnce(mockTag);
      const spyReviewSaveByFn = jest.spyOn(mockReviewRepository, 'save');

      // When
      const result = await reviewService.createReview(
        mockUser as User,
        mockCafeId,
        mockImages as Express.MulterS3.File[],
        mockCreateDto as CreateReviewDto,
      );

      // Then
      expect(result).toBeUndefined();
      expect(spyCafeFindOneByFn).toHaveBeenCalledTimes(1);
      expect(spyCafeFindOneByFn).toHaveBeenCalledWith({ id: mockCafeId });
      expect(spyTagFindOneByFn).toHaveBeenCalledTimes(1);
      expect(spyTagFindOneByFn).toHaveBeenCalledWith({ id: mockTagId });
      expect(spyReviewSaveByFn).toHaveBeenCalledTimes(1);
    });

    it('FAILURE: 검색할 카페가 존재하지 않으면 Not Found Exception을 반환한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(undefined);

      // When
      let hasThrown = false;
      try {
        await reviewService.createReview(
          mockUser as User,
          mockCafeId,
          mockImages as Express.MulterS3.File[],
          mockCreateDto as CreateReviewDto,
        );

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

    it('FAILURE: 검색할 태그가 존재하지 않으면 Not Found Exception을 반환한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(mockCafe);
      const spyTagFindOneByFn = jest.spyOn(mockTagRepository, 'findOneBy');
      spyTagFindOneByFn.mockResolvedValueOnce(undefined);

      // When
      let hasThrown = false;
      try {
        await reviewService.createReview(
          mockUser as User,
          mockCafeId,
          mockImages as Express.MulterS3.File[],
          mockCreateDto as CreateReviewDto,
        );

        // Then
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
        expect(error.getResponse()).toEqual({
          error: 'Not Found',
          message: 'NOT_FOUND_TAG',
          statusCode: 404,
        });
      }
      expect(hasThrown).toBeTruthy();
    });
  });
});
