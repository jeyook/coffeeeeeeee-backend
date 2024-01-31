import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SectionService } from './section.service';
import { Section } from '../entity/section.entity';

describe('SectionService', () => {
  let sectionService: SectionService;

  const mockSectionRepository = {
    findOne: jest.fn(),
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
      createdAt: 2024,
      updatedAt: 2024,
      deletedAt: null,
      id: 1,
      name: 'hongdae',
      geom: { type: 'Polygon', coordinates: [[Array]] },
      cafes: [
        {
          createdAt: 2024,
          updatedAt: 2024,
          deletedAt: null,
          id: 1,
          placeId: 1,
          address: '홍대1번출구',
          name: '스타벅스',
          mapX: 11,
          mapY: 12,
          phoneNumber: '010000000',
          imageUrl: 'qewr',
          homepageUrl: 'http://www.starbucks.co.kr',
        },
        {
          createdAt: 2024,
          updatedAt: 2024,
          deletedAt: null,
          id: 2,
          placeId: 1,
          address: '홍대2번출구',
          name: '커피빈',
          mapX: 11,
          mapY: 12,
          phoneNumber: '010000000',
          imageUrl: 'qewr',
          homepageUrl: 'http://www.starbucks.co.kr',
        },
      ],
    };

    it('SUCCESS: section을 정상적으로 조회한다.', async () => {
      const spySectionFindOneFn = jest.spyOn(mockSectionRepository, 'findOne');
      spySectionFindOneFn.mockResolvedValueOnce(mockSection);

      const expectedResult = mockSection;

      const result = await sectionService.getSectionByName(mockSectionName);

      expect(result).toEqual(expectedResult);
      expect(spySectionFindOneFn).toHaveBeenCalledTimes(1);
      expect(spySectionFindOneFn).toHaveBeenCalledWith({ name: mockSectionName });
    });
  });
});
