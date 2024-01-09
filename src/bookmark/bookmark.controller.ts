import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { User } from 'src/entity/user.entity';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  async getBookmark() {}

  @Post()
  async createBookmark(@Body('cafeId') cafeId: number) {
    // TODO: JWT 완성되면 지우기
    const user = new User();
    user.id = 1;
    user.email = 'test@example.com';
    user.nickname = 'test-user';

    // body가 dto로 받아와서 아래 내용을 채운뒤에 service에 dto로 넘겨줘야 할까요 내일까지 확인후 수정하겠습니다 혹시 코멘트 있으면 답변 부탁드려요
    // const bookmark = new CreateBookmarkDto();
    // bookmark.cafeId = cafeId;
    // bookmark.userId = user.id;

    await this.bookmarkService.createBookmark(user, cafeId);
  }
}
