import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { Like } from '../entity/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from '../entity/cafe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Cafe])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
