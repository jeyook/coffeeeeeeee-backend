import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entity/user.entity';
import { UserRole } from '../entity/user-role.entity';
import { Provider } from '../entity/provider.entity';

import { jwtConfig } from '../config/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleOAuthStrategy } from './google-oauth.strategy';
import { TokenAuthStrategy } from './token-auth.strategy';
import { KakaoOAuthStrategy } from './kakao-oauth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, Provider]),
    PassportModule,
    UserModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [AuthService, GoogleOAuthStrategy, TokenAuthStrategy, KakaoOAuthStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
