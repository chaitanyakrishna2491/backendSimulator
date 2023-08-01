import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRatingService } from './productRating.service';
import { ProductRatingController } from './productRating.controller';
import { ProductRating } from './entities/productRating.entity';
import { Product } from 'src/products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRating,Product])],
  exports: [TypeOrmModule],
  providers: [ProductRatingService],
  controllers: [ProductRatingController],
})
export class ProductRatingModule {}