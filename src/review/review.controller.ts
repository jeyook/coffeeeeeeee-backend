import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthUserData } from '../auth/decorator/auth-user-data.decorator';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { User } from '../entity/user.entity';
import { ReviewExceptionFilter } from '../filter/review-exception.filter';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('/cafe')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/:cafeId/review')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @UseFilters(ReviewExceptionFilter)
  async createReview(
    @AuthUserData() user: User,
    @Param('cafeId', ParseIntPipe) cafeId: number,
    @UploadedFiles() images: Express.MulterS3.File[],
    @Body() dto: CreateReviewDto,
  ): Promise<CommonResponseDto<void>> {
    await this.reviewService.createReview(user, cafeId, images, dto);

    return CommonResponseDto.successNoContent(ResponseMessage.CREATE_SUCCESS);
  }
}
