import { Body, Controller, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from 'src/entity/user.entity';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

// TODO: 엔드포인트 고민
@Controller('/place')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/:placeId/review')
  @UseInterceptors(FilesInterceptor('images'))
  async createReview(
    @Param('placeId') placeId: number,
    @UploadedFiles() images: Express.MulterS3.File[],
    @Body() dto: CreateReviewDto,
  ): Promise<CommonResponseDto<void>> {
    // TODO: JWT 완성되면 지우기
    const user = new User();
    user.id = 1;
    user.email = 'test@example.com';
    user.nickname = 'test-user';

    await this.reviewService.createReview(placeId, images, dto, user);

    return CommonResponseDto.successNoContent(ResponseMessage.CREATE_SUCCESS);
  }
}
