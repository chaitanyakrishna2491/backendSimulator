import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { Orders } from './entities/orders.entity';
import { ProductsService } from 'src/products/products.service';
import { ProductVarient } from 'src/products/entities/productvarient.entity';
import { Product } from 'src/products/entities/products.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { UsersService } from 'src/user/user.service';
import { Users } from 'src/user/entities/user.entity';
import { TwilioNotification } from 'src/utils/TwilioNotificationService';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, ProductVarient, Product, Cart, Users])],
  exports: [TypeOrmModule],
  providers: [OrdersService, ProductsService, CartService, UsersService, TwilioNotification],
  controllers: [OrdersController],
})
export class OrderModule {}