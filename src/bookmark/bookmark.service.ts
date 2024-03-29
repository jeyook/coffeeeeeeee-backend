import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageRequestDto } from '../common/dto/page-request.dto';
import { PageResponseDto } from '../common/dto/page-response.dto';
import { Bookmark } from '../entity/bookmark.entity';
import { Cafe } from '../entity/cafe.entity';
import { User } from '../entity/user.entity';
import { BookmarkResponseDto } from './dto/bookmark-resposnse.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Cafe) private readonly cafeRepository: Repository<Cafe>,
    @InjectRepository(Bookmark) private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  async getPaginatedBookmark(
    user: User,
    dto: PageRequestDto,
  ): Promise<PageResponseDto<BookmarkResponseDto>> {
    // 조회기능 구현시 사용
    const limit = dto.getLimit();
    const offset = dto.getOffset();
    const [foundBookmarks, foundBookmarkTotalCount] = await this.bookmarkRepository.findAndCount({
      where: {
        user: { id: user.id },
      },
      take: limit,
      skip: offset,
    });
    const foundBookmarkTotalPage = Math.ceil(foundBookmarkTotalCount / limit);
    const currentPage = dto.pageNo;
    if (foundBookmarkTotalPage < currentPage) throw new BadRequestException('PAGE_OUT_OF_RANGE');
    const bookmarkResponseDtos = foundBookmarks.map(
      (foundBookmark) => new BookmarkResponseDto(foundBookmark),
    );

    return new PageResponseDto<BookmarkResponseDto>(
      currentPage,
      foundBookmarkTotalCount,
      limit,
      bookmarkResponseDtos,
    );
  }

  async createBookmark(user: User, cafeId: number): Promise<void> {
    const foundCafe = await this.cafeRepository.findOneBy({ id: cafeId });
    if (!foundCafe) throw new NotFoundException('NOT_FOUND_CAFE');

    const bookmark = this.bookmarkRepository.create({
      user: user,
      cafe: foundCafe,
    });

    await this.bookmarkRepository.save(bookmark);
  }

  async deleteBookmark(user: User, cafeId: number): Promise<void> {
    const foundBookmark = await this.bookmarkRepository.findOneBy({
      cafe: {
        id: cafeId,
      },
      user: {
        id: user.id,
      },
    });
    if (!foundBookmark) throw new NotFoundException('NOT_FOUND_BOOKMARK');
    await this.bookmarkRepository.remove(foundBookmark);
  }
}
