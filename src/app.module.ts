import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CafeModule } from './cafe/cafe.module';
import { typeOrmConfig } from './config/type-orm.config';
import { ReviewModule } from './review/review.module';
import { SectionModule } from './section/section.module';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,
    CafeModule,
    AuthModule,
    PassportModule,
    ReviewModule,
    BookmarkModule,
    SectionModule,
    LikeModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
