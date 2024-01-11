import { TagResponseDto } from 'src/common/dto/tag-response.dto';
import { ReviewImage } from 'src/entity/review-image.entity';
import { ReviewTag } from 'src/entity/review-tag.entity';
import { User } from 'src/entity/user.entity';
import { Review } from '../../entity/review.entity';

interface ReviewImageDto {
  id: number;
  url: string;
}

interface ReviewUserDto {
  id: number;
  nickname: string;
}

// TODO: 이름에 Response나 Request 고민해보기
export class ReviewResponseDto {
  private id: number;

  private rating: number;

  private content: string;

  private user: ReviewUserDto;

  private images: ReviewImageDto[];

  private tag: TagResponseDto[];

  constructor(review: Review) {
    this.id = review.id;
    this.rating = review.rating;
    this.content = review.content;
    this.user = mapUserToDto(review.user);
    this.images = mapReviewImagesToDto(review.reviewImages);
    this.tag = mapReviewTagsToDto(review.reviewTags);
  }
}

const mapUserToDto = (user: User): ReviewUserDto => {
  return {
    id: user.id,
    nickname: user.nickname,
  };
};

const mapReviewImagesToDto = (reviewImages: ReviewImage[]): ReviewImageDto[] =>
  reviewImages
    .map((reviewImage) => {
      return {
        id: reviewImage.id,
        url: reviewImage.url,
      };
    })
    .sort((a, b) => {
      return a.id - b.id;
    });

const mapReviewTagsToDto = (reviewTags: ReviewTag[]): TagResponseDto[] =>
  reviewTags.map((reviewTag) => new TagResponseDto(reviewTag.tag.id, reviewTag.tag.name));
