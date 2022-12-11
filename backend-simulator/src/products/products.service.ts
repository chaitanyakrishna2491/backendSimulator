import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  createProduct(product: Product): Promise<InsertResult> {
    return this.productsRepository.insert(product);
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
  findProductVarientsByProduct(product_id: number): Promise<ProductVarient[]> {
    return this.productvarientRepository.findBy({ product_id });
  }

  createProductVarient(productVarient: ProductVarient): Promise<InsertResult> {
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
}