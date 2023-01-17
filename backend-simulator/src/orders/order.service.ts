import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Orders } from './entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) {}

  /****************Orders CRUD********************/
  findAllOrders(user_id: number): Promise<Orders[]> {
    return this.ordersRepository.findBy({user_id});
  }

  findOneOrder(order_id: number): Promise<Orders> {
    return this.ordersRepository.findOneBy({ order_id });
  }

  findOrderByStatus(order_status: string): Promise<Orders> {
    return this.ordersRepository.findOneBy({ order_status });
  }

  createOrder(order: Orders): Promise<InsertResult> {
    return this.ordersRepository.insert(order);
  }

  async updateorder(order_id: number, order: Orders): Promise<UpdateResult> {
    const orderList: Orders[] = await this.ordersRepository.findBy({ order_id })
    if(orderList && orderList.length){
      return this.ordersRepository.update(order_id, order);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeOrder(order_id: number): Promise<DeleteResult> {
    return await this.ordersRepository.delete(order_id);
  }

}