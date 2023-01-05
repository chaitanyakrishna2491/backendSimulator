import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller()
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /****************Cart CRUD********************/
  @Get('readCart')
  getCart(): Promise<Cart[]> {
    return this.cartService.getCart();
  }
  @Get('readCartItem/:id')
  getCartItem(@Param('id') cart_id: number): Promise<Cart> {
    return this.cartService.findOneCartItem(cart_id);
  }
  @Post('addToCart')
  addToCart(@Body() cart: Cart): Promise<InsertResult> {
    return this.cartService.createCartItem(cart);
  }
  @Put('updateCartItem/:id')
  updateCart(@Param('id') cart_id: number, @Body() cart:Cart): Promise<UpdateResult> {
    return this.cartService.updateCartItem(cart_id, cart);
  }
  @Delete('removeFromCart/:id')
  deleteCart(@Param('id') cart_id: number): Promise<DeleteResult> {
    return this.cartService.removeFromCart(cart_id);
  }
}
