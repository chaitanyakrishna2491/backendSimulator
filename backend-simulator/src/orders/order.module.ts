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

@Module({
  imports: [TypeOrmModule.forFeature([Orders, ProductVarient, Product, Cart])],
  exports: [TypeOrmModule],
  providers: [OrdersService, ProductsService, CartService],
  controllers: [OrdersController],
})
export class OrderModule {}