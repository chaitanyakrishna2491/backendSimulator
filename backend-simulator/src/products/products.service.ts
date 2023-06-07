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
import { Categories } from 'src/category/entities/category.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { ProductRating } from 'src/productRating/entities/productRating.entity';
import { Orders } from 'src/orders/entities/orders.entity';
import { Pagination, Search } from 'src/globalHelper';

@Injectable()
export class ProductsService {
  
  
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(ProductRating)
    private productRatingRepository: Repository<ProductRating>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(ProductVarient)
    private productvarientRepository: Repository<ProductVarient>,
    private brandService: BrandService,
    
  ) {}

  /****************Products CRUD********************/



 

  async findAllProducts(n?: number, page?: number): Promise<any> {
    const products = await this.productsRepository.find();
    const productsWithBrands = [];
    const pageSize = n || 24;
    console.log(page);
    const startIndex = (page ? (page - 1) * pageSize : 0);
    var r=0;let v5=pageSize;
    while(r<startIndex){v5++;r++;}
    console.log('startIndex:', startIndex, 'page:', page, 'pageSize:', pageSize);
    const endIndex = Math.min(v5, products.length);
  
    for (let i = startIndex; i < endIndex; i++) {
      const product = products[i];
      const brand = await this.brandRepository.findOneBy({ brand_id: product.brand_id });
      productsWithBrands.push({ ...products[i], brand });
    }
    return productsWithBrands;
  }



  async m1s(name:string,n?: number, page?: number):Promise<any> {
    var ab=await this.productsRepository.find();var aby=[];
    for(var y of ab) {
     var yb=await this.brandRepository.findOneBy({brand_id:y.brand_id});
      aby.push({...y,"brand_details":yb})
    }
    return Search(name,aby,n,page);
  }


  
  async multiSearchPbc(name:string,n?: number, page?: number):Promise<any> {
    var ab=await this.categoryRepository.find();
    var cats= Search(name,ab,24,1);
    if(cats.length>0) {
        var abp=[];
        for(var i of cats ) {

          var zx=await this.productsRepository.findBy({"cat_id":i.cat_id,});
          abp = [...abp, ...zx];
        }
        return abp.filter((item,index) => {if(index < 24) return item;});
    }
    else {
    var bds=await this.brandRepository.find();
      var brands=Search(name,bds,24,1);
      if(brands.length>0) {
        var bps=[];
        for( var j of brands) {
          var cv=await this.productsRepository.findBy({"brand_id":j.brand_id});
          bps = [...bps,...cv];
        } 
        return bps.filter((item,index) => {if(index < 24) return item;});
      }
     else {
    var prds=await this.productsRepository.find();
      var gh= Search(name,prds,24,1);
      return gh;

     }
    }

  }
  
  

  async findOneProduct(product_id: number): Promise<any> {
    var ab=await  this.productsRepository.findOneBy({ product_id });
    var cd=await this.brandRepository.findOneBy({"brand_id":ab.brand_id});
    var ef=await this.cartRepository.findBy({"product_id":product_id});
    var gh=await this.productvarientRepository.findBy({"product_id":product_id});
    var qw=await this.productRatingRepository.findBy({"product_id":product_id});
    var yt=await this.categoryRepository.findOneBy({"cat_id":ab.cat_id});

    var cv=await this.ordersRepository.find();
    var arr=[];
    for(var a of cv) {
      var pv=JSON.parse(a.products_and_varients);
      if(pv.product_id==product_id) { 
        arr.push(a);
      }
    }
    var req={...ab,"brand_details":cd,"Category_details":yt,"Associated_carts":ef,"Product_Varients":gh,"Associated_Orders":arr,"product_ratings":qw}
    return req;
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

  async findByBrandWithDetails(brand_id: number,n?:number,page?:number): Promise<Product[]> {
    var cd=await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .select(['product', 'brand.brand_id', 'brand.title', 'brand.slug', 'brand.url', 'brand.image', 'brand.parent', 'brand.level', 'brand.description', 'brand.status', 'brand.added_by', 'brand.tax_type', 'brand.tax_name', 'brand.tax_per', 'brand.tx_id', 'brand.hide'])
      .where('product.brand_id = :brand_id', { brand_id })
      .getMany();

    var gh=Pagination(cd,n,page); return gh;
  }
  

  

  

  // findByBrand(brand_id: number): Promise<Product[]> {
  //   return this.productsRepository.find({
  //     where: { brand_id },
  //     relations: ['brand']
  //   });
  // }
  

  async findByCategory(cat_id: number,n?: number, page?: number): Promise<any> {
    var cd=await this.productsRepository.findBy({ cat_id });
    var gh=Pagination(cd,n,page); return gh; 
  }

  async getFeaturedProducts(n?: number, page?: number): Promise<any>{
    var cd=await this.productsRepository.findBy({ "featured":1 });
    var gh=Pagination(cd,n,page);
    return gh;
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
    var pr= await this.productsRepository.findOneBy({ product_id });
    if(pr){
      return this.productsRepository.update(product_id, {...pr,...product});
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
  async findProductVarientsByProductId(product_id: number,n?: number, page?: number): Promise<any> {
    var cd=await this.productvarientRepository.findBy({ product_id });
    var gh=Pagination(cd,n,page);
    return gh;
  }

  findProductVarientByVarientId(varient_id: number): Promise<ProductVarient> {
    return this.productvarientRepository.findOneBy({ varient_id });
  }

          async m3s(n?: number, page?: number):Promise<any> {
            var cd=await this.productvarientRepository.find();
           var gh=Pagination(cd,n,page);
           return gh;
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

  // async updateProductVarient(varient_id: number, productVarient: ProductVarient): Promise<UpdateResult> {
  //   var varientList: ProductVarient[] = await this.productvarientRepository.findBy({ varient_id })
  //   if(varientList && varientList.length){
  //     return this.productvarientRepository.update(varient_id, productVarient);
  //   }else{
  //     return new Promise<UpdateResult>((resolve, reject) => {
  //        resolve(null)
  //     })
  //   }
  // }

  async updateProductVarient(varient_id: number, productVarient: ProductVarient): Promise<UpdateResult> {
    var ExistingVarient= await this.productvarientRepository.findOneBy({ varient_id })
    if(ExistingVarient){
      return this.productvarientRepository.update(varient_id, {...ExistingVarient,...productVarient});
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
  // getStockAvailablity(): Promise<ProductVarient[]>{
  //   return this.productvarientRepository.find({ relations: {
  //     product: true,
  // } });
  // }

  async findAllpv(n?: number, page?: number): Promise<any> {
    var pv=await this.productvarientRepository.find();
    var pvv=[];
    for(var pv1 of pv) {
      var pr=await this.productsRepository.findOneBy({product_id:pv1.product_id});
      pvv.push({...pv1, pr });

    }
    var cd=pvv;
    var gh=Pagination(cd,n,page);
    return gh;

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