import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity';
import { ProductVarient } from './entities/productvarient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductVarient])],
  exports: [TypeOrmModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}