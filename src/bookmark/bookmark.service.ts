import { Injectable } from '@nestjs/common';
import { Bookmark } from 'src/entity/bookmark.entity';
import { BookmarkCreateDto } from './dto/bookmark-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from 'src/entity/cafe.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Cafe) private readonly cafeRepository: Repository<Cafe>,
    @InjectRepository(Bookmark) private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  async getAllBookmark() {
    return await this.bookmarkRepository.find();
  }

  async createBookmark(user: User, cafeId: number): Promise<void> {
    const bookmarkDto = new BookmarkCreateDto();
    const cafe = await this.cafeRepository.findOneBy({ id: cafeId });
    const bookmark = bookmarkDto.toEntity(cafe, user);
    await this.bookmarkRepository.save(bookmark);
  }
}
