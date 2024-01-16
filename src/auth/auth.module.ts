import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from 'src/entity/user.entity';
import { UserRole } from 'src/entity/user-role.entity';
import { Provider } from 'src/entity/provider.entity';

import { UserModule } from 'src/user/user.module';
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, GoogleOAuthStrategy, TokenAuthStrategy, KakaoOAuthStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
