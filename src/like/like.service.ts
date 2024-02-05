import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from '../entity/like.entity';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Cafe } from '../entity/cafe.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
    @InjectRepository(Cafe) private readonly cafeRepository: Repository<Cafe>,
  ) {}

  async createLike(user: User, cafeId: number): Promise<void> {
    const cafe = await this.cafeRepository.findOneBy({ id: cafeId });
    if (!cafe) throw new NotFoundException('CAFE_NOT_FOUND');

    const like = this.likeRepository.create({
      user: user,
      cafe: cafe,
    });

    await this.likeRepository.save(like);
  }

  async deleteLike(user: User, cafeId: number): Promise<void> {
    const like = await this.likeRepository.findOne({
      where: {
        user: user,
        cafe: { id: cafeId },
      },
    });
    if (!like) throw new NotFoundException('LIKE_NOT_FOUND');

    await this.likeRepository.remove(like);
  }
}
