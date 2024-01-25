import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Provider } from 'src/entity/provider.entity';
import { UserRole } from 'src/entity/user-role.entity';
import { User } from 'src/entity/user.entity';

import { UserModule } from 'src/user/user.module';
import { jwtConfig } from '../config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOAuthStrategy } from './google-oauth.strategy';
import { KakaoOAuthStrategy } from './kakao-oauth.strategy';
import { TokenAuthStrategy } from './token-auth.strategy';

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
