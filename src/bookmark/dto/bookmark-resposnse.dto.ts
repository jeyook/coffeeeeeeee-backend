import { Bookmark } from '../../entity/bookmark.entity';
import { Cafe } from '../../entity/cafe.entity';
import { User } from '../../entity/user.entity';

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
    this.user = this.mapUserToDto(bookmark.user);
    this.cafe = this.mapCafeToDto(bookmark.cafe);
  }
  private mapUserToDto(user: User): BookmarkUserDto {
    return {
      id: user.id,
    };
  }

  private mapCafeToDto(cafe: Cafe): BookmarkCafeDto {
    return {
      id: cafe.id,
    };
  }
}
