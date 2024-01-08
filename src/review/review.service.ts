import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from '../entity/cafe.entity';
import { Review } from '../entity/review.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Cafe)
    private readonly cafeRepository: Repository<Cafe>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async createReview(
    cafeId: number,
    images: Express.MulterS3.File[],
    dto: CreateReviewDto,
    user: User,
  ): Promise<void> {
    const cafe = await this.cafeRepository.findOneBy({ id: cafeId });
    if (!cafe) throw new NotFoundException('NOT_FOUND_CAFE');

    const tags = await Promise.all(
      dto.tagIds.map(async (tagId) => {
        const tag = await this.tagRepository.findOneBy({ id: tagId });
        if (!tag) throw new NotFoundException('NOT_FOUND_TAG');

        return tag;
      }),
    );
    const review = dto.toEntity(cafe, user, images, tags);

    await this.reviewRepository.save(review);
  }
}
