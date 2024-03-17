import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PageRequestDto } from '../common/dto/page-request.dto';
import { Cafe } from '../entity/cafe.entity';
import { Review } from '../entity/review.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let reviewService: ReviewService;

  const mockReviewRepository = {
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
  };
  const mockCafeRepository = {
    findOneBy: jest.fn(),
  };
  const mockTagRepository = {
    findOneBy: jest.fn(),
  };
  const mockDataSource = {
    transaction: jest.fn(),
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
        {
          provide: DataSource,
          useValue: mockDataSource,
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
    const mockReview = {
      id: 1,
      rating: 1,
      content: '테스트입니다.',
    };
    const mockCreateDto = {
      rating: 1,
      content: '테스트입니다.',
      tagIds: [mockTagId],
      toEntity: function (): Review {
        return mockReview as Review;
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
      expect(spyReviewSaveByFn).toHaveBeenCalledWith(mockReview);
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

  describe('getPaginatedReview()', () => {
    const mockCafeId = 1;
    const mockPageRequestDto = {
      pageNo: 2,
      getOffset: function (): number {
        return 10;
      },
      getLimit: function (): number {
        return 10;
      },
    };
    const mockUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
    };
    const mockCafe = {
      id: mockCafeId,
      placeId: 1,
      address: '주소',
      name: '목카페',
      mapX: 123,
      mapY: 456,
      phoneNumber: '010-1234-5678',
      imageUrl: 'https://image.imgage',
      homepageUrl: 'https://homepage.homepage',
    };
    const mockReviews = [
      {
        id: 1,
        rating: 1,
        content: '테스트입니다.',
        user: {
          id: 1,
          nickname: '테스트',
        },
        reviewImages: [
          {
            id: 1,
            url: 'test',
          },
        ],
        reviewTags: [
          {
            tag: {
              id: 1,
              name: '목태그',
            },
          },
        ],
      },
    ];
    const mockReviewResponseDto = {
      id: 1,
      rating: 1,
      content: '테스트입니다.',
      isMyReview: true,
      user: {
        id: 1,
        nickname: '테스트',
      },
      images: [
        {
          id: 1,
          url: 'test',
        },
      ],
      tags: [
        {
          id: 1,
          name: '목태그',
        },
      ],
    };
    let mockReviewsTotalCount = 20;

    it('SUCCESS: 리뷰를 정상적으로 조회한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(mockCafe);
      const spyReviewFindAndCountFn = jest.spyOn(mockReviewRepository, 'findAndCount');
      spyReviewFindAndCountFn.mockResolvedValueOnce([mockReviews, mockReviewsTotalCount]);

      const expectedResult = {
        currentPage: mockPageRequestDto.pageNo,
        pageSize: mockPageRequestDto.getLimit(),
        totalCount: mockReviewsTotalCount,
        totalPage: Math.ceil(mockReviewsTotalCount / mockPageRequestDto.getLimit()),
        items: [mockReviewResponseDto],
      };

      // When
      const result = await reviewService.getPaginatedReview(
        mockCafeId,
        mockPageRequestDto as PageRequestDto,
        mockUser as User,
      );

      // Then
      expect(result).toEqual(expectedResult);
      expect(spyCafeFindOneByFn).toHaveBeenCalledTimes(1);
      expect(spyCafeFindOneByFn).toHaveBeenCalledWith({ id: mockCafeId });
      expect(spyReviewFindAndCountFn).toHaveBeenCalledTimes(1);
      expect(spyReviewFindAndCountFn).toHaveBeenCalledWith({
        where: {
          cafe: { id: mockCafe.id },
        },
        take: mockPageRequestDto.getLimit(),
        skip: mockPageRequestDto.getOffset(),
        order: { createdAt: 'DESC' },
        relations: {
          user: true,
          reviewTags: { tag: true },
        },
      });
    });

    it('FAILURE: 검색할 카페가 존재하지 않으면 Not Found Exception을 반환한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(undefined);

      // When
      let hasThrown = false;
      try {
        await reviewService.getPaginatedReview(
          mockCafeId,
          mockPageRequestDto as PageRequestDto,
          mockUser as User,
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

    it('FAILURE: 검색할 카페가 존재하지 않으면 Bad Request Exception을 반환한다.', async () => {
      // Given
      mockReviewsTotalCount = 10;
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(mockCafe);
      const spyReviewFindAndCountFn = jest.spyOn(mockReviewRepository, 'findAndCount');
      spyReviewFindAndCountFn.mockResolvedValueOnce([mockReviews, mockReviewsTotalCount]);

      // When
      let hasThrown = false;
      try {
        await reviewService.getPaginatedReview(
          mockCafeId,
          mockPageRequestDto as PageRequestDto,
          mockUser as User,
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

  describe('getOneReview()', () => {
    const mockCafeId = 1;
    const mockUser = {
      id: 1,
      nickname: '테스트',
      email: 'test@test.com',
      socialId: 'test1234',
    };
    const mockReviewId = 1;
    const mockCafe = {
      id: mockCafeId,
      placeId: 1,
      address: '주소',
      name: '목카페',
      mapX: 123,
      mapY: 456,
      phoneNumber: '010-1234-5678',
      imageUrl: 'https://image.imgage',
      homepageUrl: 'https://homepage.homepage',
    };
    const mockReview = {
      id: 1,
      rating: 1,
      content: '테스트입니다.',
      user: {
        id: 1,
        nickname: '테스트',
      },
      reviewImages: [
        {
          id: 1,
          url: 'test',
        },
      ],
      reviewTags: [
        {
          tag: {
            id: 1,
            name: '목태그',
          },
        },
      ],
    };

    it('SUCCESS: 리뷰를 정상적으로 개별 조회한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(mockCafe);
      const spyReviewFindOneFn = jest.spyOn(mockReviewRepository, 'findOne');
      spyReviewFindOneFn.mockResolvedValueOnce(mockReview);

      const expectedResult = new ReviewResponseDto(mockReview as Review, mockUser as User);

      // When
      const result = await reviewService.getOneReview(mockUser as User, mockCafeId, mockReviewId);

      // Then
      expect(result).toEqual(expectedResult);
      expect(spyCafeFindOneByFn).toHaveBeenCalledTimes(1);
      expect(spyCafeFindOneByFn).toHaveBeenCalledWith({ id: mockCafeId });
      expect(spyReviewFindOneFn).toHaveBeenCalledTimes(1);
      expect(spyReviewFindOneFn).toHaveBeenCalledWith({
        where: {
          id: mockReviewId,
          cafe: {
            id: mockCafe.id,
          },
          user: {
            id: mockUser.id,
          },
        },
        relations: {
          user: true,
          reviewTags: { tag: true },
        },
      });
    });

    it('FAILURE: 검색할 카페가 존재하지 않으면 Not Found Exception을 반환한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(null);

      // When
      let hasThrown = false;
      try {
        await reviewService.getOneReview(mockUser as User, mockCafeId, mockReviewId);

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

    it('FAILURE: 검색할 리뷰가 존재하지 않으면 Not Found Exception을 반환한다.', async () => {
      // Given
      const spyCafeFindOneByFn = jest.spyOn(mockCafeRepository, 'findOneBy');
      spyCafeFindOneByFn.mockResolvedValueOnce(mockCafe);
      const spyReviewFindOneFn = jest.spyOn(mockReviewRepository, 'findOne');
      spyReviewFindOneFn.mockResolvedValueOnce(null);

      // When
      let hasThrown = false;
      try {
        await reviewService.getOneReview(mockUser as User, mockCafeId, mockReviewId);

        // Then
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
        expect(error.getResponse()).toEqual({
          error: 'Not Found',
          message: 'NOT_FOUND_REVIEW',
          statusCode: 404,
        });
      }
      expect(hasThrown).toBeTruthy();
    });
  });
});
