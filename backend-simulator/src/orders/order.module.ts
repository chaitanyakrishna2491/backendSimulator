import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { Orders } from './entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  exports: [TypeOrmModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrderModule {}