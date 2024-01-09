import { Bookmark } from 'src/entity/bookmark.entity';
import { Cafe } from 'src/entity/cafe.entity';
import { User } from 'src/entity/user.entity';

export class BookmarkCreateDto {
  readonly userId: number;
  readonly cafeId: number;

  toEntity(cafe: Cafe, user: User): Bookmark {
    const bookmark = new Bookmark();
    bookmark.cafe = cafe;
    bookmark.user = user;
    return bookmark;
  }
}
