import { IsNotEmpty, MaxLength } from 'class-validator';
import { ReviewImage } from '../../entity/review-image.entity';
import { ReviewTag } from '../../entity/review-tag.entity';
import { Review } from '../../entity/review.entity';
import { Tag } from '../../entity/tag.entity';

export class UpdateReviewDto {
  @IsNotEmpty()
  readonly rating: number;

  @IsNotEmpty()
  @MaxLength(500)
  readonly content: string;

  // TODO: 태그 최대, 최소 얼마나? (제외)
  // @IsArray()
  // @ArrayMaxSize(2)
  // @ArrayMinSize(2)
  readonly tagIds: number[];

  toEntity(review: Review, images: Express.MulterS3.File[], tags: Tag[]): Review {
    const reviewImages = images.map((image) => {
      const reviewImage = new ReviewImage();
      reviewImage.url = image.location;

      return reviewImage;
    });

    const reviewTags = tags?.map((tag) => {
      const reviewTag = new ReviewTag();
      reviewTag.tag = tag;

      return reviewTag;
    });

    review.rating = this.rating;
    review.content = this.content;
    review.reviewImages = reviewImages;
    review.reviewTags = reviewTags;

    return review;
  }
}
