import { Bookmark } from 'src/entity/bookmark.entity';
import { Cafe } from 'src/entity/cafe.entity';
import { User } from 'src/entity/user.entity';

interface BookmarkUserDto {
  id: number;
}
interface BookmarkCafeDto {
  id: number;
}

export class BookmarkResponseDto {
  private user: BookmarkUserDto;
  private cafe: BookmarkCafeDto;

  constructor(bookmark: Bookmark) {
    this.user = mapUserToDto(bookmark.user);
    this.cafe = mapCafeToDto(bookmark.cafe);
  }
  mapUserToDto = (user: User): BookmarkUserDto => {
    return {
      id: user.id,
    };
  };

  mapCafeToDto = (cafe: Cafe): BookmarkUserDto => {
    return {
      id: cafe.id,
    };
  };
}
