import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { User } from 'src/entity/user.entity';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  async getBookmark() {}

  @Post()
  async createBookmark(@Body() body) {
    // TODO: JWT 완성되면 지우기
    const user = new User();
    user.id = 1;
    user.email = 'test@example.com';
    user.nickname = 'test-user';

    await this.bookmarkService.createBookmark(user, body.cafeId);
  }
}
