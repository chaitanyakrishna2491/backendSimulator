import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRatingService } from './productRating.service';
import { ProductRatingController } from './productRating.controller';
import { ProductRating } from './entities/productRating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRating])],
  exports: [TypeOrmModule],
  providers: [ProductRatingService],
  controllers: [ProductRatingController],
})
export class ProductRatingModule {}