import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { User } from 'src/entity/user.entity';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';
import { AuthUserData } from 'src/auth/decorator/auth-user-data.decorator';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  async getBookmark() {}

  @Post()
  @UseGuards(TokenAuthGuard)
  async createBookmark(@AuthUserData() user: User, @Body('cafeId') cafeId: number) {
    await this.bookmarkService.createBookmark(user, cafeId);
  }
}
