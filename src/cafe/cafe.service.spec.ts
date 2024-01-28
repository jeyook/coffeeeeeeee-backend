import { Test, TestingModule } from '@nestjs/testing';
import { CafeService } from './cafe.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from '../entity/cafe.entity';
import { CafeResponseDto } from './dto/cafe-response.dto';

class MockCafeRepository extends Repository<Cafe> {
  findOne = jest.fn();
}

describe('CafeService', () => {
  let cafeService: CafeService;
  let cafeRepository: MockCafeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CafeService,
        {
          provide: getRepositoryToken(Cafe),
          useClass: MockCafeRepository,
        },
      ],
    }).compile();

    cafeService = module.get<CafeService>(CafeService);
    cafeRepository = module.get<MockCafeRepository>(getRepositoryToken(Cafe));
  });

  describe('getCafeById', () => {
    it('should return CafeResponseDto when cafe is found', async () => {
      const mockCafe = new Cafe();
      cafeRepository.findOne.mockReturnValueOnce(mockCafe);

      const result = await cafeService.getCafeById(1);

      expect(result).toBeInstanceOf(CafeResponseDto);
      expect(result).toEqual(new CafeResponseDto(mockCafe));
      expect(cafeRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when cafe is not found', async () => {
      cafeRepository.findOne.mockReturnValueOnce(undefined);

      await expect(cafeService.getCafeById(1)).rejects.toThrowError(NotFoundException);
      expect(cafeRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
