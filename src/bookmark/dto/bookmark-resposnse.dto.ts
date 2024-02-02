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
    this.user = mapUserToDto(bookmark.user);
    this.cafe = mapCafeToDto(bookmark.cafe);
  }
}

const mapUserToDto = (user: User): BookmarkUserDto => {
  return {
    id: user.id,
  };
};

const mapCafeToDto = (cafe: Cafe): BookmarkUserDto => {
  return {
    id: cafe.id,
  };
};
