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

  async getAll() {
    return await this.bookmarkRepository.find();
  }

  async createBookmark(user: User, bookmarkDto: BookmarkCreateDto): Promise<void> {
    const cafe = await this.cafeRepository.findOneBy({ id: bookmarkDto.post_id });
    const bookmark = bookmarkDto.toEntity(cafe, user);
    await this.bookmarkRepository.save(bookmark);
  }
}
