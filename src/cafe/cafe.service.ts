import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from '../entity/cafe.entity';

@Injectable()
export class CafeService {
  constructor(
    @InjectRepository(Cafe)
    private readonly cafeRepository: Repository<Cafe>,
  ) {}

  async getCafeById(cafeId: number): Promise<Cafe | undefined> {
    const cafe = await this.cafeRepository.findOne({ where: { id: cafeId } });

    if (!cafe) {
      throw new NotFoundException(`CAFE WITH ID ${cafeId} NOT FOUND`);
    }

    return cafe;
  }
}
