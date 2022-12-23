import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { parse } from 'papaparse';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  /****************Brands CRUD********************/
  getBrand(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  findOneBrandItem(brand_id: number): Promise<Brand> {
    return this.brandRepository.findOneBy({ brand_id });
  }

  createBrandItem(brand_item: Brand): Promise<InsertResult> {
    return this.brandRepository.insert(brand_item);
  }

  async uploadBrands(file: Express.Multer.File): Promise<InsertResult>{
    const csvFile = readFileSync('./files/Brands.csv');
    const brands: Brand[] = await parse(csvFile.toString(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data
    }).data
    return this.brandRepository.insert(brands);
  }

  async updateBrandItem(brand_id: number, brand_item: Brand): Promise<UpdateResult> {
    const brandList: Brand[] = await this.brandRepository.findBy({ brand_id })
    if(brandList && brandList.length){
      return this.brandRepository.update(brand_id, brand_item);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeFromBrand(brand_id: number): Promise<DeleteResult> {
    return await this.brandRepository.delete(brand_id);
  }
}