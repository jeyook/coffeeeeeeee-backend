import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from 'src/entity/cafe.entity';
import { Review } from 'src/entity/review.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Cafe, User])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
