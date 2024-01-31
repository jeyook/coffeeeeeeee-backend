import { Module } from '@nestjs/common';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from 'src/entity/cafe.entity';
import { Section } from '../entity/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cafe, Section])],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
