import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/products/entities/products.entity';
import { ProductsService } from 'src/products/products.service';
import { Brand } from 'src/brand/entities/brand.entity';
import { BrandService } from 'src/brand/brand.service';
import { ProductVarient } from 'src/products/entities/productvarient.entity';
import { Orders } from 'src/orders/entities/orders.entity';
import { ProductRating } from 'src/productRating/entities/productRating.entity';
import { Categories } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories,ProductRating,Cart,Orders,Product,Brand,ProductVarient])],
  exports: [TypeOrmModule],
  providers: [CartService,ProductsService,BrandService],
  controllers: [CartController],
})
export class CartModule {}