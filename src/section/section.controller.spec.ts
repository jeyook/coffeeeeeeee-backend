import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { BadRequestException } from '@nestjs/common';

describe('SectionController', () => {
  let sectionController: SectionController;

  const mockSectionService = {
    getSectionByName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionController],
      providers: [
        ConfigService,
        {
          provide: SectionService,
          useValue: mockSectionService,
        },
      ],
    }).compile();

    sectionController = module.get<SectionController>(SectionController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sectionController).toBeDefined();
  });

  describe('getSectionByName()', () => {
    const mockSectionName = 'hongdae';
    const mockSectionResponseDto = {
      id: 1,
      name: 'hongdae',
      geom: '',
      cafe: [
        {
          id: 1,
          placeId: 1,
          address: '홍대',
          mapX: 1,
          mapY: 1,
        },
      ],
    };

    it('SUCCESS: section을 정상적으로 조회한다.', async () => {
      const spyGetSectionByNameFn = jest.spyOn(mockSectionService, 'getSectionByName');
      spyGetSectionByNameFn.mockResolvedValueOnce(mockSectionResponseDto);

      const expectedResult = {
        message: 'READ_SUCCESS',
        statusCode: 200,
        data: mockSectionResponseDto,
      };

      const result = await sectionController.getSectionByName(mockSectionName);

      expect(result).toEqual(expectedResult);
      expect(spyGetSectionByNameFn).toHaveBeenCalledTimes(1);
      expect(spyGetSectionByNameFn).toHaveBeenCalledWith(mockSectionName);
    });

    it('FAILURE: sectionName 값이 없으면 BadRequestException을 반환한다.', async () => {
      await expect(sectionController.getSectionByName('')).rejects.toThrow(BadRequestException);
    });
  });
});
