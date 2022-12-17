import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/products.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ProductVarient } from './entities/productvarient.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /****************Products CRUD********************/
  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }
  @Get('product/:id')
  getProduct(@Param('id') product_id: number): Promise<Product> {
    return this.productsService.findOneProduct(product_id);
  }
  @Post('product')
  addProduct(@Body() product: Product): Promise<InsertResult> {
    return this.productsService.createProduct(product);
  }
  @Put('product/:id')
  updateproduct(@Param('id') product_id: number, @Body() product:Product): Promise<UpdateResult> {
    return this.productsService.updateproduct(product_id, product);
  }
  @Delete('product/:id')
  deleteProduct(@Param('id') product_id: number): Promise<DeleteResult> {
    return this.productsService.removeProduct(product_id);
  }

  /****************ProductVarient CRUD********************/
  @Get('productVarient/product/:product_id')
  getProductVarientByProduct(@Param('product_id') product_id: number): Promise<ProductVarient[]> {
    return this.productsService.findProductVarientsByProductId(product_id);
  }
  @Get('productVarient/productVarient/:varient_id')
  getProductVarientByVarient(@Param('varient_id') varient_id: number): Promise<ProductVarient> {
    return this.productsService.findProductVarientByVarientId(varient_id);
  }
  @Post('productVarient')
  addProductVarient(@Body() productVarient: ProductVarient): Promise<InsertResult> {
    return this.productsService.createProductVarient(productVarient);
  }
  @Put('productVarient/:varient_id')
  updateproductVarient(@Param('varient_id') varient_id: number, @Body() ProductVarient:ProductVarient): Promise<UpdateResult> {
    return this.productsService.updateProductVarient(varient_id, ProductVarient);
  }
  @Delete('productVarient/:varient_id')
  deleteProductVarient(@Param('varient_id') varient_id: number): Promise<DeleteResult> {
    return this.productsService.removeProductVarient(varient_id);
  }
}
