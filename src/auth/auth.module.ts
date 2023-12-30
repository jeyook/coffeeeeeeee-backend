import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleOAuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
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
  providers: [AuthService, GoogleOAuthStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
