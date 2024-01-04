import { Cafe } from 'src/entity/cafe.entity';
import { ReviewImage } from 'src/entity/review-image.entity';
import { Review } from 'src/entity/review.entity';
import { User } from 'src/entity/user.entity';

export class ReviewCreateDto {
  readonly rating: number;

  readonly content: string;

  toEntity(cafe: Cafe, user: User, images: Express.MulterS3.File[]): Review {
    const reviewImages = images.map((image) => {
      const reviewImage = new ReviewImage();
      reviewImage.url = image.location;

      return reviewImage;
    });

    const review = new Review();
    review.rating = this.rating;
    review.content = this.content;
    review.cafe = cafe;
    review.user = user;
    review.reviewImages = reviewImages;

    return review;
  }
}
