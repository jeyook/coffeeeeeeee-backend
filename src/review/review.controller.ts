import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserData } from '../auth/decorator/auth-user-data.decorator';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { PageRequestDto } from '../common/dto/page-request.dto';
import { PageResponseDto } from '../common/dto/page-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { User } from '../entity/user.entity';
import { ReviewExceptionFilter } from '../filter/review-exception.filter';
import { ApiDocumentation } from './decorator/review-api-documentation';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@ApiTags('review')
@Controller('/cafe')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiDocumentation()
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

  @ApiDocumentation()
  @Get('/:cafeId/review')
  @UseGuards(new TokenAuthGuard({ isTokenOptional: true }))
  async getPaginatedReview(
    @Param('cafeId', ParseIntPipe) cafeId: number,
    @Query() dto: PageRequestDto,
    @AuthUserData() user?: User,
  ): Promise<CommonResponseDto<PageResponseDto<ReviewResponseDto>>> {
    const result = await this.reviewService.getPaginatedReview(cafeId, dto, user);

    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, result);
  }

  @ApiDocumentation()
  @Get('/:cafeId/review/:reviewId')
  @UseGuards(TokenAuthGuard)
  async getOneReview(
    @AuthUserData() user: User,
    @Param('cafeId', ParseIntPipe) cafeId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<CommonResponseDto<ReviewResponseDto>> {
    const result = await this.reviewService.getOneReview(user, cafeId, reviewId);

    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, result);
  }

  // TODO: cafeId를 받아야하나?
  @ApiDocumentation()
  @Put('/:cafeId/review/:reviewId')
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @UseFilters(ReviewExceptionFilter)
  async updateReview(
    @AuthUserData() user: User,
    @Param('cafeId', ParseIntPipe) cafeId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @UploadedFiles() images: Express.MulterS3.File[],
    @Body() dto: UpdateReviewDto,
  ): Promise<CommonResponseDto<void>> {
    await this.reviewService.updateReview(user, cafeId, reviewId, images, dto);

    return CommonResponseDto.successNoContent(ResponseMessage.UPDATE_SUCCESS);
  }

  @ApiDocumentation()
  @Delete('/:cafeId/review/:reviewId')
  @UseGuards(TokenAuthGuard)
  async deleteReview(
    @AuthUserData() user: User,
    @Param('cafeId', ParseIntPipe) cafeId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<CommonResponseDto<void>> {
    await this.reviewService.deleteReview(user, cafeId, reviewId);

    return CommonResponseDto.successNoContent(ResponseMessage.DELETE_SUCCESS);
  }
}
