import { Controller, Get, Param, Post, Put, Delete, Body, Headers, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { CartDTO } from './CartDTO.dto';

@ApiHeader({
  name: 'userId',
})
@Controller('cart')
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /****************Cart CRUD********************/
  @Get('ByUserId')
  getCart(@Headers("userId") userId: number,@Query('items_per_page') n?: number,@Query('page_number') pgn?: number): Promise<any> {
    return this.cartService.getCart(userId,n,pgn);
  }

  @Get("findcartAll")
  getCartup(@Query('items_per_page') n?: number,@Query('page_number') pgn?: number): Promise<any> {
    return this.cartService.getCartup(n,pgn);
  }
  @Get('Cart__Search/:keyword')
  m1(@Param('keyword') name:string , @Query('items_per_page') n?: number,@Query('page_number') pgn?: number):Promise<any> {
    return this.cartService.CartSearch(name,n,pgn);
  }

  @Get('findAllPc/user_id')
  getCartpc(@Param('user_id') user_id:number,@Query('items_per_page') n?: number,@Query('page_number') pgn?: number): Promise<any> {
    return this.cartService.findAllpcs(user_id,n,pgn);
  }

  @Get('ByCartId:id')
  getCartItem(@Param('id') cart_id: number): Promise<Cart> {
    return this.cartService.findOneCartItem(cart_id);
  }
  @Post('insertIntoCart')
  addToCart(@Body() cart: Cart): Promise<InsertResult> {
    return this.cartService.createCartItem(cart);
  }
  @Put(':id')
  updateCart(@Param('id') cart_id: number, @Body() cart:Cart): Promise<UpdateResult> {
    return this.cartService.updateCartItem(cart_id, cart);
  }
  @Delete(':id')
  deleteCart(@Param('id') cart_id: number): Promise<DeleteResult> {
    return this.cartService.removeFromCart(cart_id);
  }
}
