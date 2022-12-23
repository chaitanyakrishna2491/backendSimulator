import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Categories } from './entities/category.entity';
import { parse } from 'papaparse';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  /****************Categorys CRUD********************/
  getCategory(): Promise<Categories[]> {
    return this.categoryRepository.find();
  }

  findOneCategoryItem(cat_id: number): Promise<Categories> {
    return this.categoryRepository.findOneBy({ cat_id });
  }

  createCategoryItem(category_item: Categories): Promise<InsertResult> {
    return this.categoryRepository.insert(category_item);
  }

  async uploadCategories(file: Express.Multer.File): Promise<InsertResult>{
    const csvFile = readFileSync('./files/Categories.csv');
    const categories: Categories[] = await parse(csvFile.toString(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data
    }).data
    return this.categoryRepository.insert(categories);
  }

  async updateCategoryItem(cat_id: number, category_item: Categories): Promise<UpdateResult> {
    const categoryList: Categories[] = await this.categoryRepository.findBy({ cat_id })
    if(categoryList && categoryList.length){
      return this.categoryRepository.update(cat_id, category_item);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeFromCategory(category_id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(category_id);
  }
}