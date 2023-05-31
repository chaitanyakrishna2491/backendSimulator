import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { DeleteResult, InsertResult, Repository, UpdateResult,FindOneOptions } from 'typeorm';
import { Product } from './entities/products.entity';
import { ProductVarient } from './entities/productvarient.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { BrandController } from 'src/brand/brand.controller';
import { BrandService } from 'src/brand/brand.service';
import { BrandModule } from 'src/brand/brand.module';
import { BrandRepository } from 'src/brand/BrandRepository';

@Injectable()
export class ProductsService {
  
  
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,


    @InjectRepository(ProductVarient)
    private productvarientRepository: Repository<ProductVarient>,
    private brandService: BrandService,
    
  ) {}

  /****************Products CRUD********************/

  //  findAllProducts(): Promise<Product[]> {
  //   return this.productsRepository.find();
  // }

  // findAllProducts(): Promise<Product[]> {
  //   return this.productsRepository.find({ relations: ['brand'] });
  // }
  

  // async findAllProducts(): Promise<Product[]> {
  //   const products = await this.productsRepository.find();
  //   const productsWithBrands = [];
  
  //   for (const product of products) {
  //     const brand = await this.brandRepository.findOneBy({ brand_id: product.brand_id });
  //     productsWithBrands.push({ ...product, brand });
  //   }
  
  //   return productsWithBrands;
  // }

  async findAllProducts(n?: number): Promise<Product[]> {
    const products = await this.productsRepository.find();
    const productsWithBrands = [];var n1=50;
  
    for (let i = 0; i < (n1 ? Math.min(n1, products.length) : products.length); i++) {
      const product = products[i];
      const brand = await this.brandRepository.findOneBy({ brand_id: product.brand_id });
      productsWithBrands.push({ ...product, brand });
    }
  
    return productsWithBrands;
  }
  
  

  findOneProduct(product_id: number): Promise<Product> {
    return this.productsRepository.findOneBy({ product_id });
  }

  // findByBrand(brand_id: number): Promise<Product[]> {
  //   return this.productsRepository.findBy({ brand_id });
  // }

  // async findByBrandWithDetails(brand_id: number): Promise<Product[]> {
  //   return await this.productsRepository
  //     .createQueryBuilder('product')
  //     .leftJoinAndSelect('product.brand', 'brand')
  //     .where('product.brand_id = :brand_id', { brand_id })
  //     .getMany();
  // }

  async findByBrandWithDetails(brand_id: number): Promise<Product[]> {
    return await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .select(['product', 'brand.brand_id', 'brand.title', 'brand.slug', 'brand.url', 'brand.image', 'brand.parent', 'brand.level', 'brand.description', 'brand.status', 'brand.added_by', 'brand.tax_type', 'brand.tax_name', 'brand.tax_per', 'brand.tx_id', 'brand.hide'])
      .where('product.brand_id = :brand_id', { brand_id })
      .getMany();
  }
  

  

  

  findByBrand(brand_id: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: { brand_id },
      relations: ['brand']
    });
  }
  

  findByCategory(cat_id: number): Promise<Product[]> {
    return this.productsRepository.findBy({ cat_id });
  }

  getFeaturedProducts(): Promise<Product[]>{
    return this.productsRepository.findBy({ "featured":1 })
  }

  


  createProduct(product: Product): Promise<InsertResult> {
    return this.productsRepository.insert(product);
  }

  async uploadProducts(file: Express.Multer.File): Promise<InsertResult>{
    var csvFile = readFileSync('./files/Products.csv');
    var products: Product[] = await parse(csvFile.toString(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data
    }).data
    return this.productsRepository.insert(products);
  }

  async updateproduct(product_id: number, product: Product): Promise<UpdateResult> {
    var productList: Product[] = await this.productsRepository.findBy({ product_id })
    if(productList && productList.length){
      return this.productsRepository.update(product_id, product);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeProduct(product_id: number): Promise<DeleteResult> {
    return await this.productsRepository.delete(product_id);
  }

  /****************ProductVarient CRUD********************/
  findProductVarientsByProductId(product_id: number): Promise<ProductVarient[]> {
    return this.productvarientRepository.findBy({ product_id });
  }

  findProductVarientByVarientId(varient_id: number): Promise<ProductVarient> {
    return this.productvarientRepository.findOneBy({ varient_id });
  }

  createProductVarient(productVarient: ProductVarient): Promise<InsertResult> {
    return this.productvarientRepository.insert(productVarient);
  }

  async uploadProductVarient(file: Express.Multer.File): Promise<InsertResult>{
    var csvFile = readFileSync('./files/ProductVarient.csv');
    var productVarient: ProductVarient[] = await parse(csvFile.toString(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data
    }).data
    return this.productvarientRepository.insert(productVarient);
  }

  async updateProductVarient(varient_id: number, productVarient: ProductVarient): Promise<UpdateResult> {
    var varientList: ProductVarient[] = await this.productvarientRepository.findBy({ varient_id })
    if(varientList && varientList.length){
      return this.productvarientRepository.update(varient_id, productVarient);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
         resolve(null)
      })
    }
  }

  async removeProductVarient(varient_id: number): Promise<DeleteResult> {
    return await this.productvarientRepository.delete(varient_id);
  }

  

  /********************Stock Availability************ */
  getStockAvailablity(): Promise<ProductVarient[]>{
    return this.productvarientRepository.find({ relations: {
      product: true,
  } });
  }

  async findAllpv(): Promise<ProductVarient[]> {
    var pv=await this.productvarientRepository.find();
    var pvv=[];
    for(var pv1 of pv) {
      var pr=await this.productsRepository.findOneBy({product_id:pv1.product_id});
      pvv.push({...pv1, pr });

    }
    return pvv;
  }

  // async findAllProducts(): Promise<Product[]> {
  //   const products = await this.productsRepository.find();
  //   const productsWithBrands = [];
  
  //   for (const product of products) {
  //     const brand = await this.brandRepository.findOneBy({ brand_id: product.brand_id });
  //     productsWithBrands.push({ ...product, brand });
  //   }
  
  //   return productsWithBrands;
  // }



}