import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { Cafe } from '../entity/cafe.entity';
import { Section } from '../entity/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cafe, Section])],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
