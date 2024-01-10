import { Bookmark } from 'src/entity/bookmark.entity';
import { Cafe } from 'src/entity/cafe.entity';
import { User } from 'src/entity/user.entity';

export class CreateBookmarkDto {
  readonly userId: number;
  readonly cafeId: number;

  toEntity(user: User, cafe: Cafe): Bookmark {
    const bookmark = new Bookmark();
    bookmark.cafe = cafe;
    bookmark.user = user;
    return bookmark;
  }
}
