import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '../entity/section.entity';
import { Repository } from 'typeorm';
import { SectionResponseDto } from './dto/section-response.dto';

@Injectable()
export class SectionService {
  constructor(@InjectRepository(Section) private readonly sectionRepository: Repository<Section>) {}
  async getSectionByName(sectionName: string): Promise<SectionResponseDto> {
    const section = await this.sectionRepository.findOneBy({ name: sectionName });
    if (!section) throw new NotFoundException('NOT_FOUND_SECTION');
    return new SectionResponseDto(section);
  }
}
