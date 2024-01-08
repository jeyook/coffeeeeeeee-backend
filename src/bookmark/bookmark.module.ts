import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Cafe } from 'src/entity/cafe.entity';
import { Bookmark } from 'src/entity/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cafe, Bookmark])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
