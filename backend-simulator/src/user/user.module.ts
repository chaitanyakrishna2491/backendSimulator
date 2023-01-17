import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { Users } from './entities/user.entity';
import { TwilioNotification } from 'src/utils/TwilioNotificationService';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  exports: [TypeOrmModule],
  providers: [UsersService, TwilioNotification],
  controllers: [UserController],
})
export class UserModule {}