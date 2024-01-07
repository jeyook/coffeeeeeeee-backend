import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from '../entity/cafe.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Cafe)
    private readonly cafeRepository: Repository<Cafe>,
  ) {}

  async getPlaceById(placeId: number): Promise<Cafe | undefined> {
    return await this.cafeRepository.findOne({ where: { placeId } });
  }
}
//엔드포인트 2개로 나눌까..
//S3에서 이미지 url
//크롤링하고 데이터에 박는거는?
