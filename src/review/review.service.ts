import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cafe } from 'src/entity/cafe.entity';
import { Review } from 'src/entity/review.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Cafe) private readonly cafeRepository: Repository<Cafe>,
  ) {}

  async createReview(
    placeId: number,
    images: Express.MulterS3.File[],
    dto: CreateReviewDto,
    user: User,
  ): Promise<void> {
    const cafe = await this.cafeRepository.findOneBy({ id: placeId });

    const review = dto.toEntity(cafe, user, images);

    await this.reviewRepository.save(review);
  }
}
