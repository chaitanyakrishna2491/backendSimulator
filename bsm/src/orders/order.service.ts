import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Orders } from './entities/orders.entity';
import { Product } from 'src/products/entities/products.entity';
import { ProductVarient } from 'src/products/entities/productvarient.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductVarient)
    private productvarientRepository: Repository<ProductVarient>
  ) {}

  /****************Orders CRUD********************/
  findAllOrders(user_id: number): Promise<Orders[]> {
    return this.ordersRepository.findBy({user_id});
  }

  async findOneOrder(order_id:number):Promise<any> {
    var ab=await this.ordersRepository.findOneBy({"order_id":order_id});
    var pv=JSON.parse(ab.products_and_varients);
    var pr=[];
    for(var k1 of pv) {
      var q1=await this.productsRepository.findOneBy({"product_id":k1.product_id});
        var str = k1.varients;
        var arr = str.split(",").map(function(item) {
            return parseInt(item, 10);
          });
          var q2=[];
          for (var k2 of arr) {
              q2.push(await this.productvarientRepository.findOneBy({varient_id:k2.varients}));
          }
        var q3={...q1,"varients":q2}
        pr.push(q3);
      
    }
    return ({...ab,"products":pr});
  }




  // findOneOrder(order_id:number):Promise<Orders> {
  //   return this.ordersRepository.findOneBy({"order_id":order_id})
  // }


  // async findOneOrder(order_id: number): Promise<any> {

  //   var a=await this.ordersRepository.findOneBy({"order_id":order_id});
   
  //   var str = a.product_id;
  //   var arr = str.split(",").map(function(item) {
  //     return parseInt(item, 10);
  //         });
  //         var brr=[];
    
  //         for(var y of arr) {
  //             brr.push(await this.productsRepository.findOneBy({"product_id":y}));
  //         }
  //         var abc={...a,"products":brr};
    
  //   return abc;
  // }

  async findOrderByStatus(order_status: string,user_id: number): Promise<Orders[]> {
      var ab=await this.ordersRepository.findBy({"user_id":user_id});
      var ar=[];
      for( var h of ab) {
          if(h.order_status==order_status) 
          {
            ar.push(h);
          }
      }
      return ar;
  }

  createOrder(order: Orders): Promise<InsertResult> {
    return this.ordersRepository.insert(order);
  }

  async updateorder(order_id: number, order: Orders): Promise<UpdateResult> {
    const existingOrder= await this.ordersRepository.findOneBy({ order_id })
    if(existingOrder){
      return this.ordersRepository.update(order_id, {...existingOrder,...order});
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