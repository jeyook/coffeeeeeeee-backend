import { Injectable, NotFoundException } from '@nestjs/common';
import { Bookmark } from 'src/entity/bookmark.entity';
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

  async getAllBookmark(user: User) {
    // 조회기능 구현시 사용
    return await this.bookmarkRepository.find({
      where: {
        user: user,
      },
    });
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
}
