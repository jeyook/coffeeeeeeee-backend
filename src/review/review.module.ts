import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { multerConfig } from '../config/multer.config';
import { Cafe } from '../entity/cafe.entity';
import { Review } from '../entity/review.entity';
import { Tag } from '../entity/tag.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Cafe, Tag]),
    MulterModule.registerAsync(multerConfig),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
