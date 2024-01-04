import { Bookmark } from 'src/entity/bookmark.entity';
import { Cafe } from 'src/entity/cafe.entity';
import { User } from 'src/entity/user.entity';

export class BookmarkCreateDto {
  user_id: number;
  post_id: number;

  toEntity(cafe: Cafe, user: User): Bookmark {
    const bookmark = new Bookmark();
    bookmark.cafe = cafe;
    bookmark.user = user;
    return bookmark;
  }
}
