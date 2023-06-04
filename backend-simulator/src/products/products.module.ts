import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity';
import { ProductVarient } from './entities/productvarient.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { BrandService } from 'src/brand/brand.service';
import { BrandModule } from 'src/brand/brand.module';
import { BrandRepository } from 'src/brand/BrandRepository';
import { PromotionalProduct } from 'src/promotional-products/promotional-products.entity';
import { PromotionalProductsService } from 'src/promotional-products/promotional-products.service';
import { Categories } from 'src/category/entities/category.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { ProductRating } from 'src/productRating/entities/productRating.entity';
import { Orders } from 'src/orders/entities/orders.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product,Cart,Orders,ProductRating,Categories,PromotionalProduct, ProductVarient, Brand, BrandRepository ]), BrandModule],
  exports: [TypeOrmModule],
  providers: [ProductsService,PromotionalProductsService,BrandService,BrandRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}