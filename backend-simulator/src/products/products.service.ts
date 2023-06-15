import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { DeleteResult, InsertResult, Repository, UpdateResult, FindOneOptions } from 'typeorm';
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
import { PaginationParams } from 'src/utils/PaginationParams.dto';
import { Favourites } from 'src/favourites/entities/Favourites.entity';
import { Filter1 } from './Filter1.entity';

@Injectable()
export class ProductsService {


  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Favourites)
    private FavouritesRepository: Repository<Favourites>,
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

  ) { }

  /****************Products CRUD********************/

  
       async filter1(f1: Filter1): Promise<any> {

         var ab=await this.productsRepository.find();var cd;
         //console.log("****************************keyword filter*************");
         var keyword=f1.keyword;
          if(keyword)
          cd=Search(keyword,ab,ab.length,1);
          else cd=ab;
          // console.log(cd);
          // console.log("no. of results.............keyword filter.................", cd.length);



            //console.log("***************************** rating filter***************");
            if(f1.rating) {
            var sr1=cd.filter(t1=> t1.ratingValue== f1.rating );
            //console.log(sr1);
            //console.log("no. of results.............. rating filter...................", sr1.length);
          
          }


           //console.log("*****************brand filter************************");

              if(f1.brands) {
                    var arr = f1.brands.split(",").map(function(item) {
                  return parseInt(item, 10);
                });
              // sr1=sr1.filter(t1 => arr.includes(t1.brand_id));
              sr1=sr1.filter(t1 => arr.some(value=>value==t1.brand_id));
              // console.log(sr1);
              // console.log("no. of results..............brand filter...................", sr1.length);

              }


              if(f1.categories) {
                  var brr = f1.categories.split(",").map(function(item) {
                  return parseInt(item, 10);
                  });
          
              //  console.log("***********category filter*****************");
                // sr1=sr1.filter(t1=>brr.includes(t1.cat_id)  );
                sr1=sr1.filter(t1=>brr.some(value=>value==t1.cat_id));
                //console.log(sr1);
                //console.log("no. of results...........category filter.............", sr1.length);
              }


         





           if(f1.minPrice&&f1.maxPrice) {
           //console.log("************overall price filter*****************");
           sr1=sr1.filter(t1=>( t1.price>=f1.minPrice    && t1.price<=f1.maxPrice  ));
           //console.log(sr1);
           //console.log("no. of results.........overall price filter...........", sr1.length);

           }

           else if(f1.minPrice) {
           // console.log("************min price filter*****************");
            sr1=sr1.filter(t1=>( t1.price>=f1.minPrice  ));
            //console.log(sr1);
            //console.log("no. of results.........minprice filter...........", sr1.length);
           }

           else if(f1.maxPrice){
              
          // console.log("************max price filter*****************");
           sr1=sr1.filter(t1=>( t1.price<=f1.maxPrice  ));
          //  console.log(sr1);
          //  console.log("no. of results.........max price filter...........", sr1.length);

           }

           //return sr1;
          //  console.log(sr1);
          //  console.log("no. of results.........price filter...........", sr1.length);
           return Pagination(sr1,24,1);    
          
          }


  

  async UpdatedGetProducts(n?: number, page?: number): Promise<any> {
    const limit = n;
    const skip = (page - 1) * limit;

    // Use skip and take options in your repository query to implement pagination
    const [results, total] = await this.productsRepository.findAndCount({

      skip,
      take: limit,
    });

    return {
      results,
      page,
      limit,
      total,
    };
  }

  async findAllProducts(user_id: number, n?: number, page?: number): Promise<any> {
    const limit = n;
    const skip = (page - 1) * limit;
    var [results,total] = await this.productsRepository.findAndCount({
      skip,
      take: limit,
    });
    var UpdatedProductList = [];
    for (var product of results) {
      var b1 = await this.FavouritesRepository.findOneBy({ "prod_id": product.product_id, "user_id": user_id });
      if (b1) {
        product.isFavourite = true;
      }
      var b2 = await this.cartRepository.findOneBy({ "user_id": user_id, "product_id": product.product_id });
      if (b2) {
        product.cartCount = b2.qty;

      }
      var b3 = await this.brandRepository.findOneBy({ "brand_id": product.brand_id });
      if (b3) {
        UpdatedProductList.push({ ...product, "BRAND": b3 })
      }
      else UpdatedProductList.push(product);
    }
    return UpdatedProductList;
  }

  async m1s(name: string, n?: number, page?: number): Promise<any> {
    var ab = await this.productsRepository.find(); var aby = [];
    for (var y of ab) {
      var yb = await this.brandRepository.findOneBy({ brand_id: y.brand_id });
      aby.push({ ...y, "brand_details": yb })
    }
    return Search(name, aby, n, page);
  }

  async multiSearchPbc(name: string, n?: number, page?: number): Promise<any> {
    var ab = await this.categoryRepository.find();
    var cats = Search(name, ab, 24, 1);
    if (cats.length > 0) {
      var abp = [];
      for (var i of cats) {

        var zx = await this.productsRepository.findBy({ "cat_id": i.cat_id, });
        abp = [...abp, ...zx];
      }
      return abp.filter((item, index) => { if (index < 24) return item; });
    }
    else {
      var bds = await this.brandRepository.find();
      var brands = Search(name, bds, 24, 1);
      if (brands.length > 0) {
        var bps = [];
        for (var j of brands) {
          var cv = await this.productsRepository.findBy({ "brand_id": j.brand_id });
          bps = [...bps, ...cv];
        }
        return bps.filter((item, index) => { if (index < 24) return item; });
      }
      else {
        var prds = await this.productsRepository.find();
        var gh = Search(name, prds, 24, 1);
        return gh;

      }
    }

  }

  async findOneProduct(product_id: number): Promise<any> {
    var ab = await this.productsRepository.findOneBy({ product_id });
    var cd = await this.brandRepository.findOneBy({ "brand_id": ab.brand_id });
    var ef = await this.cartRepository.findBy({ "product_id": product_id });
    var gh = await this.productvarientRepository.findBy({ "product_id": product_id });
    var qw = await this.productRatingRepository.findBy({ "product_id": product_id });
    var yt = await this.categoryRepository.findOneBy({ "cat_id": ab.cat_id });

    var cv = await this.ordersRepository.find();
    var arr = [];
    for (var a of cv) {
      var pv = JSON.parse(a.products_and_varients);
      if (pv.product_id == product_id) {
        arr.push(a);
      }
    }
    var req = { ...ab, "brand_details": cd, "Category_details": yt, "Associated_carts": ef, "Product_Varients": gh, "Associated_Orders": arr, "product_ratings": qw }
    return req;
  }

  async findByBrandWithDetails(brand_id: number, n?: number, page?: number): Promise<Product[]> {
    var cd = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .select(['product', 'brand.brand_id', 'brand.title', 'brand.slug', 'brand.url', 'brand.image', 'brand.parent', 'brand.level', 'brand.description', 'brand.status', 'brand.added_by', 'brand.tax_type', 'brand.tax_name', 'brand.tax_per', 'brand.tx_id', 'brand.hide'])
      .where('product.brand_id = :brand_id', { brand_id })
      .getMany();

    var gh = Pagination(cd, n, page); return gh;
  }

  async findByCategory(user_id: number, cat_id: number, n?: number, page?: number): Promise<any> {
    const limit = n;
    const skip = (page - 1) * limit;
    const [results, total] = await this.productsRepository.findAndCount({
      where: { "cat_id": cat_id },
      skip,
      take: limit,
    });

    var UpdatedProductList = [];
    for (var product of results) {
      var b1 = await this.FavouritesRepository.findOneBy({ "prod_id": product.product_id, "user_id": user_id });
      if (b1) {
        product.isFavourite = true;
      }
      var b2 = await this.cartRepository.findOneBy({ "user_id": user_id, "product_id": product.product_id });
      if (b2) {
        product.cartCount = b2.qty;

      }
      var b3 = await this.brandRepository.findOneBy({ "brand_id": product.brand_id });
      if (b3) {
        UpdatedProductList.push({ ...product, "BRAND": b3 })
      }
      else UpdatedProductList.push(product);
    }
    return UpdatedProductList;
  }

  async getFeaturedProducts(n?: number, page?: number): Promise<any> {
    const limit = n;
    const skip = (page - 1) * limit;
    const [results, total] = await this.productsRepository.findAndCount({
      where: { "featured": 1 },
      skip,
      take: limit,
    });

    return results;

  }

  createProduct(product: Product): Promise<InsertResult> {
    return this.productsRepository.insert(product);
  }

  async uploadProducts(file: Express.Multer.File): Promise<InsertResult> {
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
    var pr = await this.productsRepository.findOneBy({ product_id });
    if (pr) {
      return this.productsRepository.update(product_id, { ...pr, ...product });
    } else {
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeProduct(product_id: number): Promise<DeleteResult> {
    return await this.productsRepository.delete(product_id);
  }

  /****************ProductVarient CRUD********************/
  async findProductVarientsByProductId(product_id: number, n?: number, page?: number): Promise<any> {
    var cd = await this.productvarientRepository.findBy({ product_id });
    var gh = Pagination(cd, n, page);
    return gh;
  }

  findProductVarientByVarientId(varient_id: number): Promise<ProductVarient> {
    return this.productvarientRepository.findOneBy({ varient_id });
  }

  async m3s(n?: number, page?: number): Promise<any> {
    const limit = n;
    const skip = (page - 1) * limit;
    const [results, total] = await this.productvarientRepository.findAndCount({
      skip,
      take: limit,
    });

    return results;
  }

  createProductVarient(productVarient: ProductVarient): Promise<InsertResult> {
    return this.productvarientRepository.insert(productVarient);
  }

  async uploadProductVarient(file: Express.Multer.File): Promise<InsertResult> {
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
    var ExistingVarient = await this.productvarientRepository.findOneBy({ varient_id })
    if (ExistingVarient) {
      return this.productvarientRepository.update(varient_id, { ...ExistingVarient, ...productVarient });
    } else {
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
    var pv = await this.productvarientRepository.find();
    var pvv = [];
    for (var pv1 of pv) {
      var pr = await this.productsRepository.findOneBy({ product_id: pv1.product_id });
      pvv.push({ ...pv1, pr });

    }
    var cd = pvv;
    var gh = Pagination(cd, n, page);
    return gh;

  }

}