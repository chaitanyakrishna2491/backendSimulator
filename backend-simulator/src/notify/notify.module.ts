import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { Transaction } from 'src/transaction/Transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notify } from './notify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notify ])],
  controllers: [NotifyController],
  providers: [NotifyService]
})
export class NotifyModule {}
