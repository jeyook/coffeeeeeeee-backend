import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from '../entity/cafe.entity';
import { CafeResponseDto } from './dto/cafe-response.dto';
import { Section } from '../entity/section.entity';

@Injectable()
export class CafeService {
  constructor(
    @InjectRepository(Cafe)
    private readonly cafeRepository: Repository<Cafe>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async getCafeById(cafeId: number): Promise<CafeResponseDto> {
    const cafe = await this.cafeRepository.findOne({ where: { id: cafeId } });

    if (!cafe) {
      throw new NotFoundException(`NOT_FOUND_CAFE`);
    }

    return new CafeResponseDto(cafe);
  }

  async getCafeListBySectionId(sectionId: number): Promise<CafeResponseDto[]> {
    const section = await this.sectionRepository.findOne({ where: { id: sectionId } });
    if (!section) throw new NotFoundException(`SECTION_NOT_FOUND`);

    const cafeList = await this.cafeRepository.find({
      relations: { cafeSection: true },
      where: {
        cafeSection: {
          id: sectionId,
        },
      },
    });
    return cafeList.map((cafe) => new CafeResponseDto(cafe));
  }
}
