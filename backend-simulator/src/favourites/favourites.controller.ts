import { Body, Controller,Delete,Get,Param,Post, Query } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { Favourites } from './entities/Favourites.entity';
import { DeleteResult, InsertResult } from 'typeorm';
import { DelFav } from './DelFav.dto';

@Controller('favourites')
export class FavouritesController {
    constructor(private readonly favService: FavouritesService) {}

    
  @Get('favourites/:user_id')
  async getProducts(@Param('user_Id') user_id:number,@Query('items_per_page') n?: number,@Query('page_number') pgn?: number): Promise<any> {
    return this.favService.getAllFav(user_id,n,pgn);
  }

  @Get('favouriteProductsDetails/:user_id')
  async getFavProducts(@Param('user_Id') user_id:number, @Query('items_per_page') n?: number,@Query('page_number') pgn?: number): Promise<any> {
    return this.favService.getFavProducts(user_id,n,pgn);
  }

  

  @Post('add--Fav')
  addProduct(@Body() fav: Favourites): Promise<InsertResult> {
    return this.favService.createFav(fav);
  }

  @Get('favProductsByUserId/:user_Id')
  getfpb(@Param('user_Id') user_Id: number):Promise<any> {
    return this.favService.fpb(user_Id);
  }

  @Delete('DelFavBy_UserId_and_ProductId')
  deleteProduct(@Body() dft:DelFav): Promise<DeleteResult> {
    const { user_id , prod_id } = dft;
    return this.favService.delfav(user_id,prod_id);
  }
  



}
