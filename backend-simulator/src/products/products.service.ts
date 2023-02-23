import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/products.entity';
import { ProductVarient } from './entities/productvarient.entity';

@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductVarient)
    private productvarientRepository: Repository<ProductVarient>
  ) {}

  /****************Products CRUD********************/
  findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOneProduct(product_id: number): Promise<Product> {
    return this.productsRepository.findOneBy({ product_id });
  }

  findByBrand(brand_id: number): Promise<Product[]> {
    return this.productsRepository.findBy({ brand_id });
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
    const csvFile = readFileSync('./files/Products.csv');
    const products: Product[] = await parse(csvFile.toString(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data
    }).data
    return this.productsRepository.insert(products);
  }

  async updateproduct(product_id: number, product: Product): Promise<UpdateResult> {
    const productList: Product[] = await this.productsRepository.findBy({ product_id })
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
    const csvFile = readFileSync('./files/ProductVarient.csv');
    const productVarient: ProductVarient[] = await parse(csvFile.toString(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data
    }).data
    return this.productvarientRepository.insert(productVarient);
  }

  async updateProductVarient(varient_id: number, productVarient: ProductVarient): Promise<UpdateResult> {
    const varientList: ProductVarient[] = await this.productvarientRepository.findBy({ varient_id })
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
}