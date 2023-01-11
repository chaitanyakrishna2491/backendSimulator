import { Controller, Get, Param, Post, Put, Delete, Body, Headers } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller('cart')
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /****************Cart CRUD********************/
  @Get()
  getCart(@Headers("userId") userId: number): Promise<Cart[]> {
    return this.cartService.getCart(userId);
  }
  @Get(':id')
  getCartItem(@Param('id') cart_id: number): Promise<Cart> {
    return this.cartService.findOneCartItem(cart_id);
  }
  @Post()
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
