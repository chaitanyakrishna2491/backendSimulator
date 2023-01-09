import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { ProductRating } from './entities/productRating.entity';
import { parse } from 'papaparse';

@Injectable()
export class ProductRatingService {
  constructor(
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

  createProductRatingItem(productRating_item: ProductRating): Promise<InsertResult> {
    return this.productRatingRepository.insert(productRating_item);
  }

  async updateProductRatingItem(rate_id: number, productRating_item: ProductRating): Promise<UpdateResult> {
    const productRatingList: ProductRating[] = await this.productRatingRepository.findBy({ rate_id })
    if(productRatingList && productRatingList.length){
      return this.productRatingRepository.update(rate_id, productRating_item);
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