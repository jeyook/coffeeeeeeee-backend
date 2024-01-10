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
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Cafe) private readonly cafeRepository: Repository<Cafe>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async createReview(
    user: User,
    cafeId: number,
    images: Express.MulterS3.File[],
    dto: CreateReviewDto,
  ): Promise<void> {
    const foundCafe = await this.cafeRepository.findOneBy({ id: cafeId });
    if (!foundCafe) throw new NotFoundException('NOT_FOUND_CAFE');

    const foundTags = await Promise.all(
      dto.tagIds.map(async (tagId) => {
        const foundTag = await this.tagRepository.findOneBy({ id: tagId });
        if (!foundTag) throw new NotFoundException('NOT_FOUND_TAG');

        return foundTag;
      }),
    );

    const review = dto.toEntity(user, foundCafe, images, foundTags);

    await this.reviewRepository.save(review);
  }
}
