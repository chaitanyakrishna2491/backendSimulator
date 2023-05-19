import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/products/entities/products.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  /****************Carts CRUD********************/
  getCart(user_id: number): Promise<Cart[]> {
    return this.cartRepository.findBy({ user_id });
  }
//   {relations: {
//     Product: true,
// }}

  getCartup(): Promise<Cart[]> {
    return this.cartRepository.find( 
          
    );
  }


/**
 * 
  async findAllProducts(): Promise<any> {
    const products = await this.productsRepository.find();
    const pcs = [];
  
    for (const product of products) {
      const cs = await this.cartRepository.findOneCartItem({ cs_id: cs.cs_id });
      pcs.push({ ...product, cs });
    }
  
    return pcs;
  }
 * 
 * 
 * 
 */

  // async findchildrencart()

  async findAllpcs(): Promise<any> {
    const cs = await this.cartRepository.find();
    const pcs = [];
  
    for (const c1 of cs) {
      const ps = await this.productsRepository.findOneBy({ product_id: c1.product_id });
      pcs.push({  c1 , ...ps});
    }
  
    return pcs;
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