import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { User } from '../entity/user.entity';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AuthUserData } from '../auth/decorator/auth-user-data.decorator';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { PageRequestDto } from '../common/dto/page-request.dto';
import { PageResponseDto } from 'src/common/dto/page-response.dto';
import { BookmarkResponseDto } from './dto/bookmark-resposnse.dto';

@Controller('/bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  @UseGuards(TokenAuthGuard)
  async getPaginatedBookmark(
    @AuthUserData() user: User,
    @Query() dto: PageRequestDto,
  ): Promise<CommonResponseDto<PageResponseDto<BookmarkResponseDto>>> {
    const result = await this.bookmarkService.getPaginatedBookmark(user, dto);
    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, result);
  }

  @Post()
  @UseGuards(TokenAuthGuard)
  async createBookmark(
    @AuthUserData() user: User,
    @Body('cafeId') cafeId: number,
  ): Promise<CommonResponseDto<void>> {
    await this.bookmarkService.createBookmark(user, cafeId);

    return CommonResponseDto.successNoContent(ResponseMessage.CREATE_SUCCESS);
  }

  @Delete('/:cafeId')
  @UseGuards(TokenAuthGuard)
  async deleteBookmark(
    @AuthUserData() user: User,
    @Param('cafeId', ParseIntPipe) cafeId: number,
  ): Promise<CommonResponseDto<void>> {
    await this.bookmarkService.deleteBookmark(user, cafeId);

    return CommonResponseDto.successNoContent(ResponseMessage.DELETE_SUCCESS);
  }
}
