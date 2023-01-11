import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  /****************Carts CRUD********************/
  getCart(user_id: number): Promise<Cart[]> {
    return this.cartRepository.findBy({ user_id });
  }

  findOneCartItem(cart_id: number): Promise<Cart> {
    return this.cartRepository.findOneBy({ cart_id });
  }

  createCartItem(cart_item: Cart): Promise<InsertResult> {
    return this.cartRepository.insert(cart_item);
  }

  async updateCartItem(cart_id: number, cart_item: Cart): Promise<UpdateResult> {
    const cartList: Cart[] = await this.cartRepository.findBy({ cart_id })
    if(cartList && cartList.length){
      return this.cartRepository.update(cart_id, cart_item);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeFromCart(cart_id: number): Promise<DeleteResult> {
    return await this.cartRepository.delete(cart_id);
  }
}