import { Controller, Get, Param, Post, Put, Delete, Body, FileTypeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductRatingService } from './productRating.service';
import { ProductRating } from './entities/productRating.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller()
@ApiBearerAuth()
export class ProductRatingController {
  constructor(private readonly productRatingService: ProductRatingService) {}

  /****************ProductRating CRUD********************/
  @Get('productRatings')
  getProductRating(): Promise<ProductRating[]> {
    return this.productRatingService.getProductRating();
  }
  @Get('productRating/:id')
  getProductRatingItem(@Param('id') productRating_id: number): Promise<ProductRating> {
    return this.productRatingService.findOneProductRatingItem(productRating_id);
  }

  @Get('productRatingsByUserId')
  async m1(@Param('product_id') prod_id:number,@Param('user_id') user_id:number ) :Promise<ProductRating>
  {
    return this.productRatingService.m1s(prod_id,user_id);
  }

  @Get('productRatingsByProductId')
  async m2(@Param('product_id') prod_id:number):Promise<ProductRating> {
    return this.productRatingService.m2s(prod_id);
  }

  @Get('productRatingsByUserId')
  async m3(@Param('user_id') user_id:number) :Promise<ProductRating[]>{
    return this.productRatingService.m3s(user_id);
  }




  @Post('productRating')
  addToProductRating(@Body() productRating: ProductRating): Promise<InsertResult> {
    return this.productRatingService.createProductRatingItem(productRating);
  }
  @Put('productRating/:id')
  updateProductRating(@Param('id') productRating_id: number, @Body() productRating:ProductRating): Promise<UpdateResult> {
    return this.productRatingService.updateProductRatingItem(productRating_id, productRating);
  }
  @Delete('productRating/:id')
  deleteProductRating(@Param('id') productRating_id: number): Promise<DeleteResult> {
    return this.productRatingService.removeFromProductRating(productRating_id);
  }
}
