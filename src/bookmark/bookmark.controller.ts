import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { User } from '../entity/user.entity';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AuthUserData } from '../auth/decorator/auth-user-data.decorator';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  @UseGuards(TokenAuthGuard)
  async getBookmark(@AuthUserData() user: User) {
    const result = await this.bookmarkService.getAllBookmark(user);

    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, result);
  }

  @Post()
  @UseGuards(TokenAuthGuard)
  async createBookmark(@AuthUserData() user: User, @Body('cafeId') cafeId: number) {
    await this.bookmarkService.createBookmark(user, cafeId);

    return CommonResponseDto.successNoContent(ResponseMessage.CREATE_SUCCESS);
  }
}
