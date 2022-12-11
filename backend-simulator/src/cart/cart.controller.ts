import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /****************Cart CRUD********************/
  @Get()
  getCart(): Promise<Cart[]> {
    return this.cartService.getCart();
  }
  @Get('cart/:id')
  getCartItem(@Param('id') cart_id: number): Promise<Cart> {
    return this.cartService.findOneCartItem(cart_id);
  }
  @Post('cart')
  addToCart(@Body() cart: Cart): Promise<InsertResult> {
    return this.cartService.createCartItem(cart);
  }
  @Put('cart/:id')
  updateCart(@Param('id') cart_id: number, @Body() cart:Cart): Promise<UpdateResult> {
    return this.cartService.updateCartItem(cart_id, cart);
  }
  @Delete('cart/:id')
  deleteCart(@Param('id') cart_id: number): Promise<DeleteResult> {
    return this.cartService.removeCart(cart_id);
  }
}
