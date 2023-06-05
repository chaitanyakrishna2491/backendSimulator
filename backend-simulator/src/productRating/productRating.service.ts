import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { ProductRating } from './entities/productRating.entity';
import { parse } from 'papaparse';
import { Product } from 'src/products/entities/products.entity';
import { Pagination } from 'src/globalHelper';

@Injectable()
export class ProductRatingService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(ProductRating)
    private productRatingRepository: Repository<ProductRating>,
  ) {}

  /****************ProductRatings CRUD********************/
  getProductRating(): Promise<ProductRating[]> {
    return this.productRatingRepository.find();
  }

  findOneProductRatingItem(rate_id: number): Promise<ProductRating> {
    return this.productRatingRepository.findOneBy({ rate_id });
  }

  async createProductRatingItem(productRating_item: ProductRating): Promise<InsertResult> {

      // var qw=await this.productRatingRepository.find(); var ab=[];

      // for(var b of qw) {
      //   if(b.product_id==productRating_item.product_id) ab.push(b);
      // }
      var ab=await this.productRatingRepository.findBy({"product_id":productRating_item.product_id});
      var pr1=await this.productsRepository.findOneBy({"product_id":productRating_item.product_id});
    // console.log(pr1);
     //console.log(ab);
      var pr=pr1;
      pr.review_count=ab.length+1;
      ab.push(productRating_item);
      var avg=0;var t=0;var tn=ab.length;
      for (var a of ab ) {
        var z=a.rating;
        console.log('asdfgh',z);
          t=t + JSON.parse(z);
      }
      avg=t/tn;
      pr.ratingValue=JSON.stringify(avg);
       await this.productsRepository.update(pr.product_id,{...pr1,...pr});
      //  await this.productsRepository.delete(pr.product_id);
      //  await this.productsRepository.insert(pr);
return await this.productRatingRepository.insert(productRating_item);
  }

  
  async m1s(prod_id:number,user_id:number):Promise<ProductRating> {
      var ab=await this.productRatingRepository.findBy({"user_id":user_id});
      for(var j of ab) {
          if(j.product_id==prod_id) {
            return j;
          }
      }
  }

  async m2s(prod_id:number):Promise<ProductRating> {
    return await this.productRatingRepository.findOneBy({product_id:prod_id});
  }

  async m3s(user_id:number,n?: number, page?: number):Promise<any> {
    var cd=await this.productRatingRepository.findBy({user_id:user_id});
    var gh=Pagination(cd,n,page); return gh;
  }

  async updateProductRatingItem(rate_id: number, productRating_item: ProductRating): Promise<UpdateResult> {
    const pr= await this.productRatingRepository.findOneBy({ rate_id })
    if(pr){
      return this.productRatingRepository.update(rate_id, {...pr,...productRating_item});
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeFromProductRating(productRating_id: number): Promise<DeleteResult> {
    return await this.productRatingRepository.delete(productRating_id);
  }
}