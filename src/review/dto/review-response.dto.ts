import { TagResponseDto } from '../../common/dto/tag-response.dto';
import { ReviewImage } from '../../entity/review-image.entity';
import { ReviewTag } from '../../entity/review-tag.entity';
import { Review } from '../../entity/review.entity';
import { User } from '../../entity/user.entity';

interface ReviewImageDto {
  id: number;
  url: string;
}

interface ReviewUserDto {
  id: number;
  nickname: string;
}

export class ReviewResponseDto {
  private id: number;

  private rating: number;

  private content: string;

  private isMyReview: boolean;

  private user: ReviewUserDto;

  private images: ReviewImageDto[];

  private tags: TagResponseDto[];

  constructor(review: Review, user?: User) {
    this.id = review.id;
    this.rating = review.rating;
    this.content = review.content;
    this.isMyReview = review.user.id === user?.id;
    this.user = this.mapUserToDto(review.user);
    this.images = this.mapReviewImagesToDto(review.reviewImages);
    this.tags = this.mapReviewTagsToDto(review.reviewTags);
  }

  private mapUserToDto(user: User): ReviewUserDto {
    return {
      id: user.id,
      nickname: user.nickname,
    };
  }

  private mapReviewImagesToDto(reviewImages: ReviewImage[]): ReviewImageDto[] {
    return reviewImages
      .map((reviewImage) => {
        return {
          id: reviewImage.id,
          url: reviewImage.url,
        };
      })
      .sort((a, b) => {
        return a.id - b.id;
      });
  }

  private mapReviewTagsToDto(reviewTags: ReviewTag[]): TagResponseDto[] {
    return reviewTags.map((reviewTag) => new TagResponseDto(reviewTag.tag.id, reviewTag.tag.name));
  }
}
