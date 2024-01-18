import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from '../entity/cafe.entity';
import { CafeResponseDto } from './dto/cafe-response.dto';

@Injectable()
export class CafeService {
  constructor(
    @InjectRepository(Cafe)
    private readonly cafeRepository: Repository<Cafe>,
  ) {}

  async getCafeById(cafeId: number): Promise<CafeResponseDto> {
    const cafe = await this.cafeRepository.findOne({ where: { id: cafeId } });

    if (!cafe) {
      throw new NotFoundException(`NOT_FOUND_CAFE`);
    }

    return new CafeResponseDto(cafe);
  }
}
