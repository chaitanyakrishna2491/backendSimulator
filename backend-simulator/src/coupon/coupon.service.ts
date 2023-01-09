import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { parse } from 'papaparse';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  /****************Coupons CRUD********************/
  getCoupon(): Promise<Coupon[]> {
    return this.couponRepository.find();
  }

  findOneCouponItem(coupon_id: number): Promise<Coupon> {
    return this.couponRepository.findOneBy({ coupon_id });
  }

  createCouponItem(coupon_item: Coupon): Promise<InsertResult> {
    return this.couponRepository.insert(coupon_item);
  }

  async uploadCoupons(file: Express.Multer.File): Promise<InsertResult>{
    const csvFile = readFileSync('./files/Coupons.csv');
    const coupons: Coupon[] = await parse(csvFile.toString(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data
    }).data
    return this.couponRepository.insert(coupons);
  }

  async updateCouponItem(coupon_id: number, coupon_item: Coupon): Promise<UpdateResult> {
    const couponList: Coupon[] = await this.couponRepository.findBy({ coupon_id })
    if(couponList && couponList.length){
      return this.couponRepository.update(coupon_id, coupon_item);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeFromCoupon(coupon_id: number): Promise<DeleteResult> {
    return await this.couponRepository.delete(coupon_id);
  }
}