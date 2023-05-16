import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity';
import { ProductVarient } from './entities/productvarient.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { BrandController } from 'src/brand/brand.controller';
import { BrandService } from 'src/brand/brand.service';
import { BrandModule } from 'src/brand/brand.module';
import { BrandRepository } from 'src/brand/BrandRepository';


@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductVarient, Brand, BrandRepository ]), BrandModule],
  exports: [TypeOrmModule],
  providers: [ProductsService,BrandService,BrandRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}