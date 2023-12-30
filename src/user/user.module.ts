import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserRole } from 'src/entity/user-role.entity';
import { Provider } from 'src/entity/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, Provider])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
