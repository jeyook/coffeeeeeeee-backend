import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from 'src/entity/user.entity';
import { ReviewExceptionFilter } from 'src/filter/review-exception.filter';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('/cafe')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/:cafeId/review')
  @UseInterceptors(FilesInterceptor('images'))
  @UseFilters(ReviewExceptionFilter)
  async createReview(
    @Param('cafeId', ParseIntPipe) cafeId: number,
    @UploadedFiles() images: Express.MulterS3.File[],
    @Body() dto: CreateReviewDto,
  ): Promise<CommonResponseDto<void>> {
    // TODO: JWT 완성되면 지우기
    const user = new User();
    user.id = 1;
    user.email = 'test@example.com';
    user.nickname = 'test-user';

    await this.reviewService.createReview(cafeId, images, dto, user);

    return CommonResponseDto.successNoContent(ResponseMessage.CREATE_SUCCESS);
  }
}
