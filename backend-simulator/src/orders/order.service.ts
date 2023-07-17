import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Orders } from './entities/orders.entity';
import { Product } from 'src/products/entities/products.entity';
import { ProductVarient } from 'src/products/entities/productvarient.entity';
import { Pagination, Search } from 'src/globalHelper';
import { ProductsService } from 'src/products/products.service'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductVarient)
    private productvarientRepository: Repository<ProductVarient>,
    private readonly productsService: ProductsService
  ) {}

  /****************Orders CRUD********************/
  async findAllOrders(user_id: number,n?: number, page?: number): Promise<any> {
    // var cd=await this.ordersRepository.findBy({"user_id":user_id,"isPlaced":true});
    // var cd=await this.ordersRepository.findBy({"user_id":user_id});
    // var cd=await this.ordersRepository.find();
    
    // console.log('zxcvbnm',cd,user_id);
    // var cd=await this.ordersRepository.find({user_id});
    // return Pagination(cd,n,page);
    const  limit=n;
    const skip = (page - 1) * limit;
    const [results, total] = await this.ordersRepository.findAndCount({
      where:{"user_id":user_id,"isPlaced":true, isCancelled:false},
      // where:{"user_id":user_id},

      order: { order_id: 'DESC' },
      //should be........order: { order_placed_timestamp: 'DESC' },
      skip,
      take: limit,
      });

      return results;

  }

  async findTotalOrders(user_id: number,n?: number, page?: number): Promise<any> {
    // var cd=await this.ordersRepository.findBy({"user_id":user_id,"isPlaced":true});
    // var cd=await this.ordersRepository.findBy({"user_id":user_id});
    // var cd=await this.ordersRepository.find();
    
    // console.log('zxcvbnm',cd,user_id);
    // var cd=await this.ordersRepository.find({user_id});
    // return Pagination(cd,n,page);
    const  limit=n;
    const skip = (page - 1) * limit;
    const [results, total] = await this.ordersRepository.findAndCount({
      // where:{"user_id":user_id,"isPlaced":true, isCancelled:false},
      where:{"user_id":user_id},

      order: { order_id: 'DESC' },
      //should be........order: { order_placed_timestamp: 'DESC' },
      skip,
      take: limit,
      });

      return results;

  }
async find5RecentOrderedProductsOfUser(user_id: number):Promise<any> {
  var ab=await this.findAllOrders(user_id,5,1);var c2=0;var arr=[];
  for(var a of ab) {
    var c=JSON.parse(a.products_and_varients);
    // var c1=c.length;
    if(c2<5) {
      for(var c3 of c) {
        arr.push(c3.product_id);
        c2++;if(c2==5) break;
      }
    }
    if(c2==5) break;
    
  }

  let brr=[];
  for(var c4 of arr) {
    var p1=await this.productsRepository.findOneBy({"product_id":c4});
    brr.push(p1);
  }
  brr = await this.productsService.populateFavouriteCartCountAndBrandDetails(brr, user_id)
  return brr;

}

  async m2s(name:string,n?: number, page?: number):Promise<any> {
    var ab=await this.ordersRepository.find();
    return Search(name,ab,n,page);
    
  }

  async findOneOrder(order_id:number):Promise<any> {
    var ab=await this.ordersRepository.findOneBy({"order_id":order_id});
    console.log(ab.products_and_varients);
    var pv=JSON.parse(ab.products_and_varients);
    var pr=[];
    for(var k1 of pv) {
      var q1=await this.productsRepository.findOneBy({"product_id":k1.product_id});
      q1.cartCount=k1.count;
        // var str = k1.varients+"";
        // console.log('zxcvb',str);
        // var arr = str.split(",").map(function(item) {
        //     return parseInt(item, 10);
        //   });
        //   var q2=[];
        //   for (var k2 of arr) {
        //       q2.push(await this.productvarientRepository.findOneBy({"varient_id":k2}));
        //   }
        // var q3={...q1,"varients":q2}
        pr.push(q1);
      
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
      const [orders, count] = await this.ordersRepository.findAndCount({
        where:{"user_id":user_id, "status": order_status},
        order: { order_id: 'DESC' }
        })
      return orders;
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