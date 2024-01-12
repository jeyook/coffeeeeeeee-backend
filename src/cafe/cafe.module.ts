import { Module } from '@nestjs/common';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from 'src/entity/cafe.entity';
import { Review } from 'src/entity/review.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Cafe, User])],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
