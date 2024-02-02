import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SectionService } from './section.service';
import { Section } from '../entity/section.entity';
import { NotFoundException } from '@nestjs/common';

describe('SectionService', () => {
  let sectionService: SectionService;

  const mockSectionRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        {
          provide: getRepositoryToken(Section),
          useValue: mockSectionRepository,
        },
      ],
    }).compile();

    sectionService = module.get<SectionService>(SectionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sectionService).toBeDefined();
  });

  describe('getSectionByName()', () => {
    const mockSectionName = 'test';

    const mockSection = {
      id: 1,
      name: 'hongdae',
      geom: {
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [0, 10],
            [10, 10],
            [10, 0],
            [0, 0],
          ],
        ],
      },
      cafes: [
        {
          id: 1,
          placeId: 1,
          address: '홍대1번출구',
          name: '스타벅스',
          mapX: 11,
          mapY: 12,
        },
        {
          id: 2,
          placeId: 1,
          address: '홍대2번출구',
          name: '커피빈',
          mapX: 11,
          mapY: 12,
        },
      ],
    };

    it('SUCCESS: section을 정상적으로 조회한다.', async () => {
      const spySectionFindOneFn = jest.spyOn(mockSectionRepository, 'findOneBy');
      spySectionFindOneFn.mockResolvedValueOnce(mockSection);

      const expectedResult = mockSection;

      const result = await sectionService.getSectionByName(mockSectionName);
      expect(result).toEqual(expectedResult);
      expect(spySectionFindOneFn).toHaveBeenCalledTimes(1);
      expect(spySectionFindOneFn).toHaveBeenCalledWith({ name: mockSectionName });
    });

    it('FAILURE: 검색할 section이 존재하지 않으면 Not Found Exception을 반환한다.', async () => {
      // Given
      const sectionName = 'NonExistentSection';
      mockSectionRepository.findOneBy.mockResolvedValueOnce(undefined);

      // When
      let hasThrown = false;
      try {
        await sectionService.getSectionByName(sectionName);
      } catch (error) {
        // Then
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.getResponse()).toEqual({
          error: 'Not Found',
          message: 'NOT_FOUND_SECTION',
          statusCode: 404,
        });
      }
      expect(hasThrown).toBeTruthy();
    });
  });
});
