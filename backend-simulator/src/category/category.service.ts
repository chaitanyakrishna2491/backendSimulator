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
    return this.categoryRepository.findBy({level:0});
  }
  async m2s(name:string,n?: number, page?: number):Promise<any> {
    var ab=await this.categoryRepository.find();
    var cd=[];
    for(var a of ab) {
      if(a.title.toLowerCase().includes(name.toLowerCase())) {
          cd.push(a);
      }
    }

   var v2=n||24;
    var v3=(page?((page-1)*v2):0);var r=0;let v5=v2;
    while(r<v3){v5++;r++;}
    
    var v4=Math.min(v5,cd.length);
    console.log('zxcvb',v5)
    var gh=[];var k=0;
    console.log('startIndex:', v3, 'page:', page, 'pageSize:', v2,'v4==',v4);
    for (let i = v3; i <v4; i++) {
      gh[k]=cd[i];
      k++;
     }

     return gh;
  }

  findOneCategoryItem(cat_id: number): Promise<Categories> {
    return this.categoryRepository.findOneBy({ cat_id });
  }


   async findcatlevel1(v:number): Promise <any> {
    var a=await this.categoryRepository.find();
  var ar=[];
   for(var ca1 of a) {
    if(ca1.level==v) {
      ar.push(ca1);
    }
  }
  return ar;
  }

  async fcc(v:number): Promise <any> {
    var b=await this.categoryRepository.find();
  var nr=[];
   for(var cat of b) {
    if(cat["parent"]==v) {
      nr.push(cat);
    }
  }
  return nr;
  }


  
  // async f22(cat_id:number): Promise <Categories[]> {
  //   var a=await this.categoryRepository.find();
  //   var br=[];
  //   for (var c1 of a) {
  //     if(c1.parent==cat_id) {
  //       br.push(c1);
  //     }
  //   }
  //   return br;
  //   }


  
  
  



  // async findAllProducts(): Promise<Product[]> {
  //   const products = await this.productsRepository.find();
  //   const productsWithBrands = [];
  
  //   for (const product of products) {
  //     const brand = await this.brandRepository.findOneBy({ brand_id: product.brand_id });
  //     productsWithBrands.push({ ...product, brand });
  //   }
  
  //   return productsWithBrands;
  // }





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

  // async updateCategoryItem(cat_id: number, category_item: Categories): Promise<UpdateResult> {
  //   const categoryList: Categories[] = await this.categoryRepository.findBy({ cat_id })
  //   if(categoryList && categoryList.length){
  //     return this.categoryRepository.update(cat_id, category_item);
  //   }else{
  //     return new Promise<UpdateResult>((resolve, reject) => {
  //       //  resolve(null)
  //     })
  //   }
  // }

  async updateCategoryItem(cat_id: number, category_item: Categories): Promise<UpdateResult> {
    const existingCategory = await this.categoryRepository.findOneBy({ cat_id })
    if(existingCategory){
      return this.categoryRepository.update(cat_id, {...existingCategory,...category_item});
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